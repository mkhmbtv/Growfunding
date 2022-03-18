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
    fund3 = Fundraiser(user_id=1,
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

    fund5 = Fundraiser(user_id=5,
                       category_id=2,
                       name='Help our school',
                       description="""Our school is a school for over 1000 students.
                       Unfortunately, it's not funded enough.
                       Your help would allow us to buy more textbooks and supplies, afford field trips
                       and other activities.
                       """,
                       city='Austin',
                       state='TX',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1647623377/growfunding/neonbrand-zFSo6bnZJTw-unsplash_gajiut.jpg',
                       goal_amount=80000)

    fund6 = Fundraiser(user_id=6,
                       category_id=3,
                       name='Fund a documentary',
                       description="""Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec 
                       scelerisque vitae dolor blandit blandit. Nunc semper id risus tristique egestas.
                       Suspendisse porta, enim id blandit tempus, turpis metus vehicula tellus, et
                       interdum enim diam nec odio. Sed cursus velit nulla, vitae volutpat nunc bibendum at.
                       Aliquam tempor lacinia tincidunt. Proin sed orci eget erat dapibus bibendum.
                       Proin porta orci quis velit laoreet vestibulum. Nam volutpat ante nec pharetra interdum.
                       """,
                       city='Manchester',
                       state='UK',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1647625388/growfunding/tyler-casey-zplYiXUxjXI-unsplash_ypo8tg.jpg',
                       goal_amount=15000)

    fund7 = Fundraiser(user_id=7,
                       category_id=4,
                       name='Help me get a surgery to fix my vision',
                       description="""I really need a surgery to correct my vision.
                       My eyesight is very poor and glasses are not helping.
                       Help me restore my vision and see clearly again!
                       """,
                       city='Vienna',
                       state='Austria',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1647623548/growfunding/brands-people-sWQrD5s0fWc-unsplash_woanpo.jpg',
                       goal_amount=4000)

    fund8 = Fundraiser(user_id=6,
                       category_id=8,
                       name='I need a car',
                       description="""I've got a driver's license, but can't afford a car.
                       Please help me buy a car. I am tired of being on feet all the time.
                       I spend all my money on rent, so it would be nice if anybody could help me out.
                       Cheers!
                       """,
                       city='Los Angeles',
                       state='CA',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1647623262/growfunding/grahame-jenkins-p7tai9P7H-s-unsplash_l0c52c.jpg',
                       goal_amount=5000)

    fund9 = Fundraiser(user_id=3,
                       category_id=6,
                       name='Raise money to plant trees',
                       description="""We are raising money to plant 500+
                       trees in our town. There are very few trees here and
                       we want to change that. Help our town and help the environment!
                       """,
                       city='Tucson',
                       state='AZ',
                       image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1647622997/growfunding/ben-vaughn-Gfv573rGwxw-unsplash_ui37wb.jpg',
                       goal_amount=8000)

    fund10 = Fundraiser(user_id=2,
                        category_id=2,
                        name='Save student newspaper',
                        description="""Our student newspaper, The Student Times,
                        is on the verge of closing. Help us keep our operation going
                        and report on important things happening in and around our
                        university and town. You would be making a huge favor
                        to the entire student community of our city.
                        Let's keep people informed!
                        """,
                        city='Pittsburgh',
                        state='PA',
                        image_url='https://res.cloudinary.com/djogxk6nz/image/upload/v1647623201/growfunding/roman-kraft-_Zua2hyvTBk-unsplash_qg0don.jpg',
                        goal_amount=15000)

    db.session.add_all([fund1, fund2, fund3, fund4, fund5, fund6, fund7, fund8,
                        fund9, fund10
                        ])
    db.session.commit()


def undo_fundraisers():
    db.session.execute('TRUNCATE fundraisers RESTART IDENTITY CASCADE;')
    db.session.commit()
