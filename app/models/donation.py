import datetime
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
    amount = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255))
    anonymous = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    donor = db.relationship('User', back_populates='donations')
    fundraiser = db.relationship('Fundraiser', back_populates='donations')

    def to_dict(self):
        return {
            'id': self.id,
            'fundraiser_id': self.fundraiser_id,
            'amount': self.amount,
            'comment': self.comment,
            'anonymous': self.anonymous,
            'donor': self.donor.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
