import sys
import os
import httpx
from datetime import datetime

# Add the parent backend directory to the Python path so we can import from db and models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import SessionLocal # Assuming db.py exposes a SessionLocal factory
from models import CO2Reading

def fetch_and_load_co2():
    url = "https://global-warming.org/api/co2-api"
    print(f"Fetching CO2 data from {url}...")
    
    # 1. Extract
    response = httpx.get(url)
    response.raise_for_status()
    data = response.json()
    
    co2_data = data.get("co2", [])
    print(f"Retrieved {len(co2_data)} records from API.")

    # 2. Transform & Load
    db = SessionLocal()
    try:
        # Get existing dates to avoid duplicating data
        # Fetching all existing dates into a set for fast lookup
        existing_records = db.query(CO2Reading.date).all()
        # Ensure we only compare dates, stripping timezones to match our created items
        existing_dates_set = {r[0].strftime("%Y-%m-%d") for r in existing_records if r[0]}

        new_records = []
        for item in co2_data:
            # Construct a YYYY-MM-DD string
            year = item.get("year")
            month = item.get("month").zfill(2) # Pad single digit months with a 0
            day = item.get("day").zfill(2)
            
            date_str = f"{year}-{month}-{day}"
            
            # Skip if we already have this date in the database
            if date_str in existing_dates_set:
                continue

            try:
                reading_date = datetime.strptime(date_str, "%Y-%m-%d")
            except ValueError:
                print(f"Skipping bad date format: {date_str}")
                continue

            # Assuming we'll use the 'cycle' property for our 'ppm' decimal value
            ppm_value = item.get("cycle")
            
            record = CO2Reading(
                date=reading_date,
                ppm=ppm_value,
                source="NOAA Mauna Loa via global-warming.org"
            )
            db.add(record)
            new_records.append(record)

        # 3. Commit new records
        if new_records:
            db.commit()
            print(f"Successfully inserted {len(new_records)} new CO2 readings into the database.")
        else:
            print("Database is already up to date. No new records inserted.")

    except Exception as e:
        db.rollback()
        print(f"Error during ETL process: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    fetch_and_load_co2()