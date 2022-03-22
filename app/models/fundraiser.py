import datetime
from .db import db


class Fundraiser(db.Model):
    __tablename__ = "fundraisers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        nullable=False)
    category_id = db.Column(db.Integer,
                            db.ForeignKey('categories.id'),
                            nullable=False)
    name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    goal_amount = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    organizer = db.relationship('User', back_populates='fundraisers')
    category = db.relationship('Category', back_populates='fundraisers')
    donations = db.relationship('Donation', back_populates='fundraiser')

    def to_simple_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'state': self.state,
            'description': self.description,
            'image_url': self.image_url,
            'goal_amount': self.goal_amount,
            'donations': [donation.to_dict() for donation in self.donations]
        }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'state': self.state,
            'description': self.description,
            'image_url': self.image_url,
            'goal_amount': self.goal_amount,
            'organizer': self.organizer.to_dict(),
            'category': self.category.to_simple_dict(),
            'donations': [donation.to_dict() for donation in self.donations],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
