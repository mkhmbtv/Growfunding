from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class CreateFundraiser(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    category_id = IntegerField(validators=[DataRequired()])
    name = StringField(validators=[DataRequired()])
    city = StringField(validators=[DataRequired()])
    state = StringField(validators=[DataRequired()])
    description = TextAreaField(validators=[DataRequired()])
    goal_amount = IntegerField(validators=[DataRequired()])
