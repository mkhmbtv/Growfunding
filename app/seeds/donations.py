from app.models import db, Donation


def seed_donations():
    don1 = Donation(user_id=1,
                    fundraiser_id=1,
                    amount=5000,
                    comment='Keep up the good work')
    don2 = Donation(user_id=2,
                    fundraiser_id=3,
                    amount=100,
                    comment='Glad you are doing it!')
    don3 = Donation(user_id=3,
                    fundraiser_id=3,
                    amount=3000,
                    comment='Love the idea')
    don4 = Donation(user_id=4,
                    fundraiser_id=2,
                    amount=300,
                    comment="Let's get you there!")
    don5 = Donation(user_id=5,
                    fundraiser_id=2,
                    amount=50)
    don6 = Donation(user_id=3,
                    fundraiser_id=4,
                    amount=100,
                    comment="Let's win some trophies!")
    don7 = Donation(user_id=5,
                    fundraiser_id=1,
                    amount=10000,
                    comment='Great job!',
                    anonymous=True)
    don8 = Donation(user_id=5,
                    fundraiser_id=3,
                    amount=20000,
                    comment='I support this cause')
    don9 = Donation(user_id=1,
                    fundraiser_id=2,
                    amount=500,
                    comment='Have an awesome trip!')
    don10 = Donation(user_id=1,
                     fundraiser_id=3,
                     amount=20000,
                     comment='Great idea!',
                     anonymous=True)
    don11 = Donation(user_id=1,
                     fundraiser_id=4,
                     amount=500,
                     comment='Good luck in the tournament!')

    db.session.add_all([don1, don2, don3, don4, don5, don6, don7, don8, don9, don10, don11])
    db.session.commit()


def undo_donations():
    db.session.execute('TRUNCATE donations RESTART IDENTITY CASCADE;')
    db.session.commit()
