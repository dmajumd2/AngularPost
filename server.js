var express = require('express'),
app = express(),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
jwt = require('jsonwebtoken');

app.use(cors({
    origin:'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/users', function(err){
    if(err){
        console.log("Connection not established");
    }
    else{
        console.log("Connection established")
    }
});

var Schema = mongoose.Schema;

var postReg_schema = new Schema({
    username: String,
    password: String,
    address: String,
    email: String,
    city: String,
    state: String,
    zip: String
});


var user_posts_reg = mongoose.model('postreg_posts', postReg_schema);

//registration of the user 
app.post('/registration', function(req, res){
    console.log(req.body);
    var userRegistration = new user_posts_reg({
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });

    userRegistration.save(function(err) {
        if (!err){
           console.log("Document saved");
           res.send({
                isRegistered: true,
                message: 'registered'
            });
        }
        else{
            res.send({
                isRegistered:false,
                message: 'Registration error'
            })
        } 
    });

});

app.listen(3000, function(){
    console.log("Server running @ localhost:3000")
});