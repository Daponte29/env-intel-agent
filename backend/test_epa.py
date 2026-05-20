import httpx
import csv
import io

def test_epa_flow():
    # 1. Setup headers to bypass the bot blocker
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    # 2. Phase 1: Get the QueryID (Filtering for Significant Noncompliance in Harris County, TX)
    print("Step 1: Requesting QueryID for Harris County, TX (High Risk Violators)...")
    url_1 = "https://echodata.epa.gov/echo/cwa_rest_services.get_facilities?output=JSON&p_st=TX&p_co=Harris&p_snc=Y"
    
    with httpx.Client(timeout=30.0) as client:
        resp_1 = client.get(url_1, headers=headers)
        resp_1.raise_for_status()
        data = resp_1.json()
        
        query_id = data.get("Results", {}).get("QueryID")
        print(f"-> Success! Received QueryID: {query_id}")
        print(f"-> Total Penalties Found: {data.get('Results', {}).get('TotalPenalties')}")
        
        if not query_id:
            print("Failed to get QueryID. Exiting.")
            return

        # 3. Phase 2: Download the CSV data using that QueryID
        print(f"\nStep 2: Downloading CSV data using QueryID {query_id}...")
        url_2 = f"https://echodata.epa.gov/echo/cwa_rest_services.get_download?output=CSV&qid={query_id}"
        resp_2 = client.get(url_2, headers=headers)
        resp_2.raise_for_status()
        
        # 4. Parse the CSV and print a quick preview
        print("\n--- CSV Data Preview (First 3 rows, First 5 columns) ---")
        reader = csv.reader(io.StringIO(resp_2.text))
        for i, row in enumerate(reader):
            if i < 3:
                print(f"Row {i}: {row[:5]} ...")
            else:
                break
                
        print("\nFlow complete! You can now see the exact CSV columns the EPA returns.")

if __name__ == "__main__":
    test_epa_flow()
