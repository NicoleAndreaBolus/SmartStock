from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.add_product, name="add_product"),
    path("sales/", views.process_sale, name="process_sale"),
    path("reports/sales/", views.generate_sales_report, name="generate_sales_report"),
]