.PHONY: up down build logs backend-shell makemigrations migrate test

# Docker Compose shortcuts
up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

logs:
	docker compose logs -f

# Backend specific commands
backend-shell:
	docker compose exec backend bash

makemigrations:
	@read -p "Enter migration message: " msg; \
	docker compose exec backend alembic revision --autogenerate -m "$$msg"

migrate:
	docker compose exec backend alembic upgrade head

test:
	docker compose exec backend pytest

# Quick run of the EPA test
test-epa:
	docker compose exec backend python test_epa.py
