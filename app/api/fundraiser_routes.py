from flask import Blueprint
from flask_login import login_required
from sqlalchemy.orm import joinedload
from app.models import db, Fundraiser, Donation


fund_routes = Blueprint('fundraisers', __name__)


@fund_routes.route('/')
def fundraisers():
    fundraisers = Fundraiser.query.join(Donation) \
                            .order_by(Donation.created_at.desc()) \
                            .options(joinedload(Fundraiser.donations)) \
                            .all()
    funds = [fundraiser.to_dict() for fundraiser in fundraisers]
    return {'fundraisers': funds}


@fund_routes.route('/<int:id>')
def fundraiser(id):
    fundraiser = Fundraiser.query.get_or_404(id)
    return fundraiser.to_dict()
