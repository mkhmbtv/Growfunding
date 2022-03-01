from app.models import db, Fundraiser


def seed_fundraisers():
    fund1 = Fundraiser(user_id=3,
                       category_id=1,
                       name='Help our animal shelter',
                       description="""Our animal shelter is in need of
                        supplies, including dog and cat food, kitty litter,
                        toys, collapsible wirecrates to transport animals
                        Part of the expenses will also go into purchasing
                        blankets, towels, and other supplies to keep
                        animals warm. Any help is greatly appreciated.""",
                       city='Madison',
                       state='WI',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1644787171/growfunding/photo-1583787317796-2bc56f8556e2_upnfpl.jpg',
                       goal_amount=20000)
    fund2 = Fundraiser(user_id=2,
                       category_id=7,
                       name='Send Marnie to England',
                       description="""My name is Marnie. I have been and avid
                        Anglophile since I was a kid. It is my lifelong
                        dream to visit England one day. I work hard towards
                        achieving this dream, but between studying and
                        working full time, I just can't afford it.
                        It would mean a world to me if you would help me to
                        finally make it happen!""",
                       city='Cleveland',
                       state='OH',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1644750360/growfunding/photo-1515621061946-eff1c2a352bd_ngcvsp.jpg',
                       goal_amount=5000)
    fund3 = Fundraiser(user_id=4,
                       category_id=6,
                       name='Support struggling small businesses',
                       description="""When the Covid pandemic hit, small business
                        owners across our city scrambled to survive. A lot of the
                        establishments had to be temporarily or permanently closed.
                        Your donations will help to keep many local businesses afloat
                        and support local community.""",
                       city='Newark',
                       state='NJ',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1644769522/growfunding/photo-1594402919317-9e67dca0a305_ymbpgy.jpg',
                       goal_amount=200000)
    fund4 = Fundraiser(user_id=4,
                       category_id=5,
                       name='Trip to a tennis tournament',
                       description="""Our son really wants to become a tennis
                       player, but it's a very expensive sport to learn.
                       His dream is to become a professional one day.
                       In order to get to that level he needs to take
                       costly tennis lessons and travel to tournaments.
                       There is a very important youth tornament ahead and he
                       really wants to compete there. Any help is appreciated!
                       """,
                       city='Dallas',
                       state='TX',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1644777589/growfunding/photo-1543382513-3617a90d9a46_aafqqh.jpg',
                       goal_amount=3000)

    db.session.add_all([fund1, fund2, fund3, fund4])
    db.session.commit()


def undo_fundraisers():
    db.session.execute('TRUNCATE fundraisers RESTART IDENTITY CASCADE;')
    db.session.commit()
