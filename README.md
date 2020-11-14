# prototype_sample_mysql_nodejs
Repository is storing program for to check feasibiloty of combination of procedure bwtween web app and database.  
**!!!! Note !!!!** Never use for production purpose, this program DOES NOT properly handle regarding security and valunerabiloties. 

# Build
Clone this repository, and buid by docker-compose CLI.
```bash
$ git clone [URL of this Repository]
$ cd prototype_sample_mysql_nodejs
$ docker-compose up --build
```

The app build with docker-compose `http://localhost:28081` is the entry URL. And when execute server from node command, such as `$ node web_server/index.js`, `http://localhost:8081`. Execute web server from node command, database on Docker must be running.  

# Custermize the code
## Database 
To custermize database schema, ` mysql_server/initialize_db.sql` is the file to create database.

## Web App
Update these file bellow:

- `web_server/index.js` : To custermize behavier of web server itself.
- `web_server/route/apiv1.js` : API code code.
- `web_server/libs/` : Directory for storing common library referring from server program.
- `web_server/static/` : This directory is set to DocumentRoot.

# Lisence
Apache License Version 2.0
