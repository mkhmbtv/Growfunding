from flask import Blueprint
from app.models import Category


category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def categories():
    categories = Category.query.order_by(Category.name).all()
    return {'categories': [category.to_dict() for category in categories]}
