var express = require('express');
var Datastore = require('nedb');

var app = express();
var db = {};

db.movies =new Datastore({filename: 'db/movies', autoload: true});

app.use(express.bodyParser());

app.get('/', function (req, res){
    res.send("the API i working");
})
    .post('/rpc', function (req, res){
        var body = req.body;
        res.set('Content-type', 'application/JSON');
        switch (body.action) {
            case "getMovies" :
                db.movies.find({}, function(err, results){
                   if (err){
                       res.send(JSON.stringify(err));
                   }
                    else{
                     res.send(JSON.stringify(results));
                   };
                });
                break;
            default:
                res.send("No action given");
        }
    })
    .listen(3000);