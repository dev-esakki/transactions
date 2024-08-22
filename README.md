# Transaction

    Project Transaction

##### Client API local Base URL

Client API base URL - `http://localhost:8080/`

##### Dependancy

    - Node v16

    - Postgres 14

    - Nice to have `pgadmin 4` for development env

##### env

    Copy the .env.example file into .env file(create it if not exists in the root directory) and populate the required values

##### Setup

    Once the dependancy has been installed run the following commands in the same order

        - Create database directly in the postgres. Refer DB creation steps below for more details

        - Update the db env variables accordingly

        - Run `npm run migrate:up`

##### Db Creation

    - create database test-db;

    - CREATE ROLE pguser LOGIN PASSWORD 'pgpass';

##### Start the server

    Run `npm start`

##### License

Copyright (c) 2024

Licensed under the [MIT license](LICENSE).
