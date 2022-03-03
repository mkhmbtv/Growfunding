from email.policy import default
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class DonationForm(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    fundraiser_id = IntegerField(validators=[DataRequired()])
    amount = IntegerField(validators=[DataRequired()])
    comment = StringField()
    anonymous = BooleanField(DataRequired(), default=False)
