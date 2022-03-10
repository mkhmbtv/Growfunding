from crypt import methods
import boto3
import botocore
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy.orm import joinedload

from app.config import Config
from app.aws_s3 import *
from app.models import db, Fundraiser, Donation
from app.forms import CreateFundraiser
from app.helpers import validation_errors_to_error_messages

fund_routes = Blueprint('fundraisers', __name__)


@fund_routes.route('/')
def fundraisers():
    fundraisers = Fundraiser.query \
                            .outerjoin(Donation) \
                            .group_by(Fundraiser.id, Donation.created_at) \
                            .order_by(db.func.count(Donation.id).desc(), Donation.created_at) \
                            .options(joinedload(Fundraiser.donations)) \
                            .limit(10) \
                            .all()
    funds = [fundraiser.to_simple_dict() for fundraiser in fundraisers]
    return {'fundraisers': funds}


@fund_routes.route('/<int:id>')
def fundraiser(id):
    fundraiser = Fundraiser.query.get(id)
    return fundraiser.to_dict()


@fund_routes.route('/', methods=['POST'])
@login_required
def create_fundraiser():
    form = CreateFundraiser()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "image" in request.files:
            image = request.files['image']
            if allowed_file(image.filename):
                image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                fundraiser = Fundraiser()
                form.populate_obj(fundraiser)
                fundraiser.image_url = image_url
                db.session.add(fundraiser)
                db.session.commit()
                return fundraiser.to_dict()
            else:
                return {"errors": ["Unsupported image format"]}, 401
        else:
            return {"errors": ["No image attached"]}, 401
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@fund_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_fundraiser(id):
    fundraiser = Fundraiser.query.get(id)
    form = CreateFundraiser()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_url = fundraiser.image_url
    
        if "image" in request.files:
            image = request.files['image']
            if allowed_file(image.filename):
                image_url = upload_file_to_s3(image, Config.S3_BUCKET)
            else:
                return {"errors": ["Unsupported image format"]}, 401
        form.populate_obj(fundraiser)
        fundraiser.image_url = image_url
        db.session.commit()
        return fundraiser.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@fund_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_fundraiser(id):
    Fundraiser.query.filter_by(id=id).delete()
    db.session.commit()
    return {"message": "success"}