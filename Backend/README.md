# SmartStock (Lab 07) - Django REST API

Backend API for **SmartStock: Inventory Management System** (Laboratory Activity 07).

## Requirements
- Python 3.x
- Django
- Django REST Framework

## Setup Instructions
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. Start the server:
   ```bash
   python manage.py runserver
   ```

Server will run at:
- http://127.0.0.1:8000/

## API Endpoints

### 1) Add Product (Manage Inventory)
- **POST** `/api/products/`

Example JSON body:
```json
{
  "name": "Coke 1L",
  "barcode": "480000000001",
  "price": 35.00,
  "stock": 50
}
```

### 2) Process Sale
- **POST** `/api/sales/`

Example JSON body:
```json
{
  "user_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

### 3) Sales Report
- **GET** `/api/reports/sales/`

Response includes:
- `total_transactions`
- `total_revenue`

## Notes
- `POST /api/products/` and `POST /api/sales/` are **POST-only** endpoints. If opened in a browser as GET requests, Django REST Framework will return **405 Method Not Allowed**.