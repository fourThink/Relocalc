#!/bin/bash
echo running npm install
npm install
echo install knex globally
npm install -g knex
echo Starting postgres server
postgres -D /usr/local/var/postgres
echo creating relocalc_dev database...
createdb relocalc_dev
echo creating tables in relocalc_dev...
knex migrate:latest
echo compiling css files...
gulp sass
echo now populating db: count to 15 then end process with cntrl + c, then start server w/ gulp start
node server/db/populateDb.js

