from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo',
                last_name='User',
                email='demo@aa.io',
                password='password')
    marnie = User(first_name='Marnie',
                  last_name='Johnson',
                  email='marnie@aa.io',
                  password='Kw4uhGBE')
    robert = User(first_name='Robert',
                  last_name='Smith',
                  email='bobbie@aa.io',
                  password='H6RHPztJ')
    stephen = User(first_name='Stephen',
                   last_name='James',
                   email='steph@aa.io',
                   password='7S2sStfU')
    julie = User(first_name='Julie',
                 last_name='Brown',
                 email='julie@aa.io',
                 password='G3dCfcA7')
    tony = User(first_name='Tony',
                last_name='Caruso',
                email='tony@gmail.com',
                password='n9Hjk2uc')
    maria = User(first_name='Maria',
                 last_name='Rubio',
                 email='maria@gmail.com',
                 password='VPC4fXjS')

    db.session.add_all([demo, marnie, robert, stephen, julie, tony, maria])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
