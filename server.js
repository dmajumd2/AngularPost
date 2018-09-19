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
        console.log("Connection established");
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
    description: String,
    uname: String,
    comments: [String],
    liked: [String]
});

var likeduser_schema = new Schema({
    uname: String,
    liked: [String]
});

var user_posts_reg = mongoose.model('postreg_posts', postReg_schema);
var posts = mongoose.model('posts', posts_schema);
var liked = mongoose.model('likes', likeduser_schema);

//registration of the user 
app.post('/registration', function(req, res){
    //console.log(req.body);
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
       // console.log(req.body);
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

app.use(function(req, res, next){
    console.log("In the token use");
    var token = req.headers['authtoken'];
    //console.log(token);
    jwt.verify(token, 'debashish-secret-key', function(err, decoded){
        if(err){
            console.log("In the if");
            res.send({
                err: true,
                msg: 'Invalid Request'
            });
        } else {
            //console.log("In the else");
            req.decoded = decoded // decoded will identify the user; whatever data we use to create a token during login wll be available in decoded
            console.log(req.decoded);
            next();
        }
    });
});

/////////////////////////deletepost/////////////////////////

app.post('/deletepost', function(req, res){
    console.log("In the delete");
    var username = req.decoded.uname;
    var id = req.body.id;
    console.log(req.decoded.uname);
    console.log(req.body.id);
    posts.deleteOne({uname: username, _id: id}, function(err){
        if (!err){
            res.send({
                 postDeleted: true,
                 message: 'post deleted'
             });
         }
         else{
             res.send({
                 postDeleted:false,
                 message: 'post not deleted'
             })
         } 
    })
})


/////////////////////savelikeduser//////////////////////
app.post('/likedUser', function(req, res){
    console.log("In the likedUser");
    console.log(req.decoded.uname);
    console.log(req.body.id);
    console.log(req.body.likedName);
    var username = req.decoded.uname;
    var id = req.body.id;
    var liked =  req.body.likedName;
    posts.findOneAndUpdate({uname: username, _id: id}, {$push : { liked : liked }}
        ,function(err, user){
            if(err){
                return res.status(500).send();
            }
            if(!user){
                return res.send({
                    isSaved: false,
                    message: "not saved"
                });
            } 
            return res.send({
                isSaved: true,
                message: "data saved",
                data: user
            });
        });
    
        });
////////////getComments/////////////////////////////
app.post('/getcomments', function(req, res){
    console.log("In the get comments");
    console.log(req.body);
    var username = req.decoded.uname;
    var id = req.body.id;
    posts.find({uname: username, _id: id}, function(err, posts){
        if(err){
            return res.status(500).send();
        }
        if(!posts){
            return res.send({
                Found: false,
                message: "posts Not Found"
            });
        }
        return res.send({
            Found: true,
            message: "posts Found",
            data: posts
        });
    });
})

/////////////////addcomments////////////////////////////
app.post('/addcomments', function(req, res){
        console.log("In the comment");
        console.log(req.decoded.uname);
        console.log(req.body);
        var username = req.decoded.uname;
        var id = req.body.id;
        var comment =  req.body.comment;
        posts.findOneAndUpdate({uname: username, _id: id}, {$push : { comments : comment }}
            ,function(err, user){
                if(err){
                    return res.status(500).send();
                }
                if(!user){
                    return res.send({
                        isSaved: false,
                        message: "not saved"
                    });
                } 
                return res.send({
                    isSaved: true,
                    message: "data saved",
                    data: user
                });
            });
        
});

/////////////////createpost/////////////////////////
app.post('/post', function(req, res){
    //console.log("In the post");
    //console.log(req.decoded.uname);
    //console.log(req.body);
    var userPost = new posts({
        title: req.body.title,
        description: req.body.description,
        uname: req.decoded.uname
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


//////////for getting the posts from DB////////////////
app.get('/getposts', function(req, res){
    // console.log("In the getpost");
     
     var username = req.decoded.uname;
     console.log(username);

        posts.find({uname: username}, function(err, posts){
            if(err){
                return res.status(500).send();
            }
            if(!posts){
                return res.send({
                    Found: false,
                    message: "posts Not Found"
                });
            }
            return res.send({
                Found: true,
                message: "posts Found",
                data: posts
            });
        });
});


app.listen(3000, function(){
    console.log("Server running @ localhost:3000")
});