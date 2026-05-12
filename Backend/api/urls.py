# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.add_product),             
    path('products/list/', views.get_products),       
    path('products/delete/<int:pk>/', views.delete_product), 
    path('sales/', views.process_sale),               
    path('reports/sales/', views.generate_sales_report),
    path('login/', views.login_user),
    path('users/list/', views.get_users),
    path('users/add/', views.add_new_user),
    path('users/delete/<int:pk>/', views.delete_user),
    ]