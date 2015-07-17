var browserify = require('browserify-middleware');
var express = require('express');
var app = express()
//var db = require('./lib/db.js');
var Restaurant = require('./models/restaurant.js')

//provide a browserified f;ile at a path
var shared = ['mithril']
app.get('/js/vendor-bundle.js', browserify(shared));
app.get('/js/app-bundle.js', browserify('./client/app/index.js', { external: shared }));


// Non-js static files
app.use(express.static('client/public'));

app.get('/restaurant', function (req, res){
 console.log('looking for restaurant!!')
 Restaurant.print("Slake")
   .then( function (restaurant){
     res.end(JSON.stringify(restaurant.name + " is expensive"));
   })
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);