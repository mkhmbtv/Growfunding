from flask import Blueprint, request
from flask_login import login_required

from app.models import db, Donation
from app.forms import DonationForm
from app.helpers import validation_errors_to_error_messages

donation_routes = Blueprint('donations', __name__)


@donation_routes.route('/', methods=['POST'])
def donate():
    form = DonationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        donation = Donation()
        form.populate_obj(donation)
        db.session.add(donation)
        db.session.commit()
        return donation.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@donation_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
def donation_by_id(id):
    donation = Donation.query.get(id)
    if (donation):
        if request.method == 'PUT':
            form = DonationForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                form.populate_obj(donation)
                db.session.commit()
                return donation.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        elif request.method == 'DELETE':
            db.session.delete(donation)
            db.session.commit()
            return {"message": "success"}
    else:
        return {"message": "Donation not found"}, 404
