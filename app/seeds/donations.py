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
                    fundraiser_id=10,
                    amount=2000,
                    comment='Great fundraiser!')
    don10 = Donation(user_id=7,
                     fundraiser_id=3,
                     amount=20000,
                     comment='Great idea!',
                     anonymous=True)
    don11 = Donation(user_id=1,
                     fundraiser_id=4,
                     amount=500,
                     comment='Good luck in the tournament!')
    don12 = Donation(user_id=1,
                     fundraiser_id=5,
                     amount=700,
                     comment='Way to go!')
    don13 = Donation(user_id=3,
                     fundraiser_id=5,
                     amount=10000,
                     comment='Happy to help')
    don14 = Donation(user_id=1,
                     fundraiser_id=6,
                     amount=200,
                     comment='Awesome')
    don15 = Donation(user_id=1,
                     fundraiser_id=7,
                     amount=500,
                     comment='Love to help out!')
    don16 = Donation(user_id=6,
                     fundraiser_id=7,
                     amount=300,
                     comment='You\'ve got it')
    don17 = Donation(user_id=1,
                     fundraiser_id=8,
                     amount=100,
                     comment='Lets buy that car')
    don18 = Donation(user_id=2,
                     fundraiser_id=9,
                     amount=2000,
                     comment='Amazing idea')
    don19 = Donation(user_id=1,
                     fundraiser_id=9,
                     amount=500,
                     comment='Let\'s make it happen!')
    don20 = Donation(user_id=7,
                     fundraiser_id=9,
                     amount=3000,
                     comment='Great job guys')
    don21 = Donation(user_id=4,
                     fundraiser_id=10,
                     amount=350,
                     comment='You\'ve got it')
    don22 = Donation(user_id=6,
                     fundraiser_id=1,
                     amount=300,
                     comment='Keep it up!')

    db.session.add_all([don1, don2, don3, don4, don5, don6, don7, don8, don9,
                        don10, don11, don12, don13, don14, don15, don16, don17,
                        don18, don19, don20, don21, don22])
    db.session.commit()


def undo_donations():
    db.session.execute('TRUNCATE donations RESTART IDENTITY CASCADE;')
    db.session.commit()
