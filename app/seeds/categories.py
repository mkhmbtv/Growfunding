from app.models import db, Category


def seed_categories():
    cat1 = Category(name="Animals")
    cat2 = Category(name="Education")
    cat3 = Category(name="Creative")
    cat4 = Category(name="Medical")
    cat5 = Category(name="Sports")
    cat6 = Category(name="Community")
    cat7 = Category(name="Travel")
    cat8 = Category(name="Wishes")

    db.session.add_all([cat1, cat2, cat3, cat4, cat5,
                        cat6, cat7, cat8])
    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
