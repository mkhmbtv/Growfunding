# GrowFunding

## Live Links

- [Live link](https://growfunding.herokuapp.com)
- [Feature List](https://github.com/mkhmbtv/Growfunding/wiki/MVP-Feature-List)

## Technologies Used

- React.js
- Redux
- JavaScript
- Python
- Flask
- SQLAlchemy
- Alembic
- PostgreSQL
- AWS/S3
- TailwindCSS
- Heroku

## What is it?

GrowFunding, a fullstack clone of GoFundMe, is a crowdfunding web site, helping people to raise money for their various needs and aspirations.

## Install Instructions

1. `git clone` this repository.
2. Install dependencies with a `pipenv install -r --dev dev-requirements.txt && pipenv install -r requirements.txt` command.
3. Create `.env` file in the root directory based on `.env.example` file.
4. Create a  PostgreSQL user and a  PostgreSQL database using `.env` configuration.
5. Run `pipenv shell` to activate pipenv environment.
6. Flask migrate and seed your database by running `flask db upgrade` and `flask seed all`.
7. Run `flask run` in the root directory to start a backend server.
8. Start a frontend server in `react-app` directory with `npm start`.
9. Go to `localhost:3000` in your browser.