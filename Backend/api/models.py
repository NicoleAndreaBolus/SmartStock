from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=100)
    role = models.CharField(max_length=50)

class Product(models.Model):
    name = models.CharField(max_length=200)
    barcode = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()

class Sales(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    transaction_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class SalesDetails(models.Model):
    sale = models.ForeignKey(Sales, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()