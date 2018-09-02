var firebase = require("firebase");
const express = require('express');
const app = express();
const imdb = require("./models/imdb.js");
app.use(express.static('public'));

// firebase config
var config = {

   };
firebase.initializeApp(config);
var db = firebase.database();
 
ref = db.ref("/movies");
app.get('/api/set', (req, res)=>{    
    imdb.crawler(function(err,dataArray){
         ref.remove(); 
         ref.set(dataArray);    
         res.send(dataArray);
    });
});
// get from firebase
app.get('/api/getAll', (req, res)=>{
    var ref = db.ref("/movies");
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
        res.send('get ' + JSON.stringify(snapshot));
    });
});

app.listen(80);