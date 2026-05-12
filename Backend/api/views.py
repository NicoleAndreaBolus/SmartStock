from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users, Product, Sales, SalesDetails
from django.db.models import Sum

# --- YOUR EXISTING CODE ---
@api_view(['POST'])
def add_product(request):
    # 1.0 Validate Input
    name = request.data.get('name')
    barcode = request.data.get('barcode')
    price = request.data.get('price')
    stock = request.data.get('stock')

    if not all([name, barcode, price, stock]):
        return Response({"status": "error", "message": "Missing product data"})

    # 2.0 Process Data & Save
    product = Product.objects.create(name=name, barcode=barcode, price=price, stock=stock)
    
    # 3.0 Format Response
    return Response({"status": "success", "message": "Product added successfully", "product_id": product.id})

@api_view(['POST'])
def process_sale(request):
    # 1.0 Validate Input
    user_id = request.data.get('user_id')
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')

    if not all([user_id, product_id, quantity]):
        return Response({"status": "error", "message": "Missing transaction data"})

    try:
        user = Users.objects.get(id=user_id)
        product = Product.objects.get(id=product_id)
        if product.stock < int(quantity):
            return Response({"status": "error", "message": "Insufficient stock"})
    except (Users.DoesNotExist, Product.DoesNotExist):
        return Response({"status": "error", "message": "Invalid user or product"})

    # 2.0 Process Data & Save
    product.stock -= int(quantity)
    product.save()

    total = product.price * int(quantity)
    sale = Sales.objects.create(user=user, total_amount=total)
    SalesDetails.objects.create(sale=sale, product=product, quantity=quantity)

    # 3.0 Format Response
    return Response({"status": "success", "message": "Sales transaction recorded", "sales_id": sale.id})

@api_view(['GET'])
def generate_sales_report(request):
    # 1.0 Process & Fetch from DB
    total_transactions = Sales.objects.count()
    total_revenue = Sales.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0.00

    # 2.0 Format Response
    return Response({
        "status": "success",
        "message": "Report generated",
        "data": {
            "total_transactions": total_transactions,
            "total_revenue": total_revenue
        }
    })

# --- NEW CODE TO ADD BELOW ---

@api_view(['GET'])
def get_products(request):
    # Fetch all products and return them as a list of dictionaries
    products = Product.objects.all().values('id', 'name', 'barcode', 'price', 'stock')
    return Response({
        "status": "success", 
        "data": list(products)
    })

@api_view(['DELETE'])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({"status": "success", "message": "Product deleted successfully"})
    except Product.DoesNotExist:
        return Response({"status": "error", "message": "Product not found"})
    
# --- FIXED LOGIN FUNCTION ---

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    
    # We accept the password from React, but we don't query the DB with it
    # because the Users model does not have a password field.
    password = request.data.get('password')

    if not username:
        return Response({"status": "error", "message": "Username required"})

    try:
        # Checking against your custom Users model (only using username)
        user = Users.objects.get(username=username)
        
        # Return the user_id, username, and role to the React frontend
        return Response({
            "status": "success", 
            "message": "Login successful", 
            "data": {
                "user_id": user.id, 
                "username": user.username,
                "role": getattr(user, 'role', 'Staff')
            }
        })
    except Users.DoesNotExist:
        return Response({"status": "error", "message": "Invalid username or password"})

@api_view(['GET'])
def get_users(request):
    # Fetch all users and return them
    users = Users.objects.all().values('id', 'username', 'role')
    return Response({
        "status": "success", 
        "data": list(users)
    })

@api_view(['POST'])
def add_new_user(request):
    username = request.data.get('username')
    role = request.data.get('role', 'Staff') # Default to Staff if none provided

    if not username:
        return Response({"status": "error", "message": "Username is required"})
    
    # Check if user already exists
    if Users.objects.filter(username=username).exists():
        return Response({"status": "error", "message": "Username already taken"})

    user = Users.objects.create(username=username, role=role)
    return Response({"status": "success", "message": "User added successfully", "user_id": user.id})

@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        user = Users.objects.get(id=pk)
        user.delete()
        return Response({"status": "success", "message": "User deleted successfully"})
    except Users.DoesNotExist:
        return Response({"status": "error", "message": "User not found"})