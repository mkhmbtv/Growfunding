from .db import db


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        nullable=False)
    fundraiser_id = db.Column(db.Integer,
                              db.ForeignKey('fundraisers.id'),
                              nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    comment = db.Column(db.String(255))
    anonymous = db.Column(db.Boolean, nullable=False, default=False)

    donor = db.relationship('User', back_populates='donations')
    fundraiser = db.relationship('Fundraiser', back_populates='donations')
