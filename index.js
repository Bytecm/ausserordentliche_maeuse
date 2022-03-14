var express = require('express');
var path = require('path');

var app = express();
var PORT = 8080;

app.get('/style.css', function(req, res){
    var options = {
        root: path.join(__dirname)
    };

    var fileName = 'www/style.css';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
