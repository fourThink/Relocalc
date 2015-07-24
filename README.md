# Relocalc   --- to be formatted...looks fine when in edit mode.

A resource for residents or businesses looking to move into Austin, TX. 
Let the app calculate a grade of the area of your interest.

## Overview

Relocal is a Mithril/Express/Postgres/  web application that taps into various Austin API's.  
From restaurant health inspections to vicious dogs that have been reported.   
Ultimately, the end user will be able to compare the results of the address entered with the Austin average.  
In addition, the user will be able to scale the importance of each element and receive a grade.  
```
+--client/
├──components
│   ├── .js       - 
│   
│
├── models
│   │
│   └── Auth.js                - 
│

├── public
│   └── index.html  - main html file
│   └── style.css   - styles
│   └── sass
         └── graphs - Where all the Sass graphs starts

    
server/                         
│                          
│── data
|    └── crimes, restaurants.js   - the json data that populates the database
│── lib
|     └── models                  - the methods needed to populate database
└── index.js                      - node server file
```

