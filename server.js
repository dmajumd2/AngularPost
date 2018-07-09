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

var posts_schema = new Schema({
    title: String,
    description: String
});


var user_posts_reg = mongoose.model('postreg_posts', postReg_schema);
var posts = mongoose.model('posts', posts_schema);


/////////////////createpost/////////////////////////
app.post('/post', function(req, res){
    console.log(req.body);
    var userPost = new posts({
        title: req.body.title,
        description: req.body.description
    });

    userPost.save(function(err) {
        if (!err){
           console.log("Document saved");
           res.send({
                postSaved: true,
                message: 'post saved'
            });
        }
        else{
            res.send({
                postSaved:false,
                message: 'post not saved'
            })
        } 
    });
    
});

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


////////login///////////////////////////

app.post('/authenticate', function(req, res){
        console.log(req.body);
        var token = jwt.sign({'uname': req.body.username}, 'debashish-secret-key', {
            expiresIn: '1h'
        });

        var username =  req.body.username;
        var password = req.body.password;

        user_posts_reg.findOne({username: username, password: password}, function(err, user){
            if(err){
                return res.status(500).send();
            }
            if(!user){
                return res.send({
                    isRegistered: false,
                    message: "Not Registered"
                });
            }
            return res.send({
                isRegistered: true,
                message: "Registered",
                data: user,
                token: token
            });
        });
});



app.listen(3000, function(){
    console.log("Server running @ localhost:3000")
});