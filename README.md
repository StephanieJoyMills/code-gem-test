Hello there! I completed this challenge using node.js paired with postgres. Knex.js served as the ORM, and postico as a client (optional)

To test the API I use Postman, documentations for all the endpoints can be found here: \_\_\_\_

# Postgres set-up

## Installation

Install Postgres with homebrew: `brew install postgresql`
Check version: `postgres -V`

## Using and Configuring PostgreSQL

Create our db: `createdb shopify-challenge`
Open up psql utility: `psql postgres`
(Optional) set password: `\password`
Check to make sure our db was created: `\list`

Other useful commands:
To drop our db: `dropdb`
To exit psql: `\q`

## (Optional) Postico

- Postgres Client for OSX

Download at: https://eggerapps.at/postico/download/
Connecting to local db: select `New Favorite` add pw, and select **Show all Databases**, click `Done` and then `Connect`

# Set-up

install dependencies: `npm install`
run migrations: `knex migrate:latest`
run seeds: `knex seed:run`
start nodemon: `npm start nodemon` or just `npm start` to run without the demon

Head over to postman: to see documentation on the various endpoints available

# Notes

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d4cddeb5d988215021c9)
