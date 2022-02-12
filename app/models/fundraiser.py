from .db import db


class Fundraiser(db.Model):
    __tablename__ = "fundraisers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        nullable=False)
    name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    goal_amount = db.Column(db.Numeric(10, 2), nullable=False)

    organizer = db.relationship('User', back_populates='fundraisers')
    donations = db.relationship('Donation', back_populates='fundraiser')
