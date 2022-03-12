import boto3
import botocore
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import or_

from app.config import Config
from app.aws_s3 import *
from app.models import db, Fundraiser, Donation, Category
from app.forms import CreateFundraiser
from app.helpers import validation_errors_to_error_messages

fund_routes = Blueprint('fundraisers', __name__)


@fund_routes.route('/')
def fundraisers():
    fundraisers = Fundraiser.query.limit(20).all()
    return {fundraiser.id: fundraiser.to_dict() for fundraiser in fundraisers}


@fund_routes.route('/top')
def top_fundraisers():
    fundraisers = Fundraiser.query \
                    .outerjoin(Donation) \
                    .group_by(Fundraiser.id, Donation.created_at) \
                    .order_by(db.func.count(Donation.id).desc(),
                              Donation.created_at.desc()) \
                    .limit(6) \
                    .all()
    return jsonify([fundraiser.id for fundraiser in fundraisers])


@fund_routes.route('/<string:category>')
def fundraisers_by_category(category):
    fundraisers = Fundraiser.query.join(Category) \
                            .filter(Category.name == category) \
                            .all()
    return {fundraiser.id: fundraiser.to_dict() for fundraiser in fundraisers}


@fund_routes.route('/<int:id>')
def fundraiser(id):
    fundraiser = Fundraiser.query.get(id)
    return fundraiser.to_dict()


@fund_routes.route('/search')
def search_fundraisers():
    q = request.args.get('q')
    fundraisers = Fundraiser.query \
                            .filter(or_(db.func.lower(Fundraiser.name)
                                        .like(f'%{q.lower()}%'),
                                        db.func.lower(Fundraiser.city)
                                        .like(f'%{q.lower()}%'),
                                        db.func.lower(Fundraiser.state)
                                        .like(f'%{q.lower()}%'))) \
                            .all()
    return {fundraiser.id: fundraiser.to_dict() for fundraiser in fundraisers}


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
