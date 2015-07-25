# Relocalc

A resource for residents or businesses looking to move into Austin, TX. 
Let the app calculate a grade of the area of your interest.

## Overview

Relocal is a Mithril/Express/Postgres/Browserify web application that taps into various Austin Open Data API's.
Each address will produce a livability score based on an algorithm which uses the available data.
The end user will be able to compare the results of particular data for an address entered with Austin averages.
In addition, the user will be able to scale the importance of each element to receive a weighted result depending on 
the users own priorities. 

```
+--client/
├── index.js - main view and routes 
├── components
│   ├── *.js       
│   
│
├── models
│   │
│   ├── Auth.js
│   ├── Location.js
│   └── Searches.js
│
├── public
│   └── index.html  - main html file
│   └── style.css   - compiled styles (don't touch)
│   └── sass
         └── .scss - write your styles here to be compiled to style.css

    
server/                         
│                          
│── data
|    └── crimes, restaurants.js   - the json data that populates the database
│── lib
|     └── search.js
|
│── models 
│   └──  *.js
│
└── index.js   - node server file
.jshintrc
gulpfile.js
knexfile.js
package.json
README
```

## Getting Started

In the terminal:

```
npm install

pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start    (must install postgres if not 
installed)

psql relocalc_dev 

node server/db/populateDb.js   

gulp start

```

To compile css, you must stop the server and run 

```
gulp sass

```