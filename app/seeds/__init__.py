from flask.cli import AppGroup
from .users import seed_users, undo_users
from .fundraisers import seed_fundraisers, undo_fundraisers
from .donations import seed_donations, undo_donations

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_fundraisers()
    seed_donations()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_fundraisers()
    undo_donations()
