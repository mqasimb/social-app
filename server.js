var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var unless = require('express-unless');

const cloudinary = require('cloudinary');

var config = require('./config');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user-model');
var Post = require('./models/post-model');
var UserProfile = require('./models/user-profile-model');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(expressJWT({ secret: config.jwtSecret}).unless({path: ['/login', '/users/login', 'register', '/users/register']}));
// }
// app.use(expressJWT({
//   secret: config.jwtSecret,
//   credentialsRequired: false,
//   getToken: function fromHeaderOrQuerystring (req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//         return req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
// }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(express.static('build'));

app.post('/users/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    const token = jwt.sign({
        username: req.user.username,
        _id: req.user._id
    }, config.jwtSecret);
    console.log('req.user AUTHENTICATE', req.user);
    res.json({ token });
  });
  
app.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/profile/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.params.username}).populate({path: 'posts', populate: {path: 'profile'}}).exec(function(err, userprofile) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        // console.log(req.user);
        res.json(userprofile);
    });
});

app.put('/api/profile/picture/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    console.log(req.body);
    UserProfile.findOne({username: req.params.username}, function(err, userprofile) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        userprofile.ProfilePicture = req.body.pictureURL;
        
        userprofile.save(function(err) {
            if(err) {
                return res.json({message: 'Internal Server Error'});
            }
            return res.json(userprofile);
        })
    });
});

app.put('/api/profile/aboutme/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    console.log(req.body);
    UserProfile.findOne({username: req.params.username}, function(err, userprofile) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        userprofile.AboutMe = req.body.aboutMe;
        
        userprofile.save(function(err) {
            if(err) {
                return res.json({message: 'Internal Server Error'});
            }
            return res.json(userprofile);
        })
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/post', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.find({}).populate('profile', 'ProfilePicture').exec(function(err, post) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        // console.log(req.user);
        res.json(post);
    });
});

app.get('/api/post/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(post);
    })
});

app.get('/api/profile/posts/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.find({name: req.params.username}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(post);
    })
});

app.post('/api/post', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    /// check whether user object
    console.log(req.body);
    UserProfile.findOne({username: req.user.username}).exec(function(err, userprofile) {
      if(err) {
          return res.json({message: 'Internal Server Error'});
      }
      Post.create({content: req.body.content, image: req.body.image, profile: userprofile._id, name:req.user.username}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post);
        UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
            if(err) {
                return res.json({message: 'Internal Server Error'});
            }
            userprofile.posts.push(post._id);
            userprofile.save(function(err) {
                if(err) {
                    return res.json({message: 'Internal Server Error'});
                }
                res.json(post);
            })
        })
    })
    })
});

app.put('/api/post/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.findOneAndUpdate({_id: req.params.id}, {$set: {content: req.body.content}}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post)
        res.status(200).json(post);
    })
});

app.delete('/api/post/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.findOneAndRemove({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
            if(err) {
                return res.json({message: 'Internal Server Error'});
            }
            var postIndex = userprofile.posts.findIndex(function(singlePost) {
                console.log(req.params.id, 'req id --- post id ', singlePost)
                return req.params.id == singlePost;
            });
            console.log(postIndex, 'post index delete post')
            if(postIndex > -1) {
                userprofile.posts.splice(postIndex, 1);
            }
            console.log(userprofile.posts, 'posts')
            userprofile.save(function(err) {
                if(err) {
                    return res.json({message: 'Internal Server Error'});
                }
                res.json(post);
            })
        })
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/comments/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    console.log(req.params.id)
    Post.findOne({_id: req.params.id}, function(err, post) {
        console.log(post, 'how is found?')
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post, 'comment post');
        post.comments.push({comment: req.body.comment, username: req.user.username, date: Date.now(), post: req.params.id});
        console.log(post.comments);
        console.log(post.comments.length);
        post.save(function(err) {
            if(err) return res.json({message: err})
          res.json(post);  
        })
    })
});

app.put('/api/comments/:postid/:commentid', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    console.log(req.body);
    console.log(req.params.postid);
    console.log(req.params.commentid)
    Post.findOne({_id: req.params.postid}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post, 'change comment edit');
        
        var returnIndex = post.comments.findIndex(function(comment) { 
            return comment._id == req.params.commentid;
        });
        console.log(returnIndex, 'index')
        if(returnIndex < 0) {
            //remove like
            return res.json({message: 'Server error finding comment'});
        }
        else {
            //add like
            console.log({username: req.user._id, like: true}, 'object log')
            post.comments[returnIndex].comment = req.body.comment;
        }
        post.save(function(err) {
            if(err) return res.send(err);
            console.log(post, 'changed post');
            res.json(post);
        });
    })
});

app.delete('/api/comments/:postid/:commentid', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.findOne({_id: req.params.postid}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post, 'change comment edit');
        
        var returnIndex = post.comments.findIndex(function(comment) { 
            return comment._id == req.params.commentid;
        });
        console.log(returnIndex, 'index')
        if(returnIndex < 0) {
            //remove like
            return res.json({message: 'Server error finding comment'});
        }
        else {
            //add like
            console.log({username: req.user._id, like: true}, 'delete comment')
            post.comments.splice(returnIndex, 1);
        }
        post.save(function(err) {
            if(err) return res.send(err);
            console.log(post, 'deleted post');
            res.json(post);
        });
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get('/api/likes/:id', function(req, res) {
//     Post.findOne({_id: req.params.id}, function(err, post) {
//         if(err) {
//             return res.status(500).json({
//                 message: 'Internal Server Error'
//             });
//         }
//         console.log(post);
//         res.json(post);
//     })
// });

app.post('/api/likes/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {

    Post.findOne({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        
    console.log(post.likes, 'This.likes');
    var returnIndex = post.likes.findIndex(function(user) { 
        console.log(user.username, 'username', req.user._id)
        return user.username == req.user._id;
    });
    console.log(returnIndex, 'index')
    if(returnIndex > -1) {
        //remove like
        post.likes.splice(returnIndex, 1);
    }
    else {
        //add like
        console.log({username: req.user._id, like: true}, 'object log')
        post.likes.push({username: req.user._id, like: true})
    }
    post.save(function(err) {
        if(err) return res.send(err);
        console.log(post, 'changed post');
        res.json(post);
    });
});
});

app.put('/api/likes/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    var newBool = req.body.likes.boolean;
    Post.findOneAndUpdate({_id: req.params.id}, {"$set": {likes: {username: req.user._id, boolean: newBool}}}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(post);
    })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

cloudinary.config({ 
  cloud_name: 'mqasimb', 
  api_key: 'mqasimb', 
  api_secret: 'pRC9jsjqVMw7QALtFXyb4__Wj0w' 
});
var strategy = new LocalStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }
        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }
        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);

app.post('/users/register', function(req, res) {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;
    var email = req.body.email;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }
    
    UserProfile.create({username: req.body.username}, function(err, userprofile) {
        if(err) {
            return res.json({message: 'Internal Server Error'});
        }
        console.log('user profile is created not saved yet')
        userprofile.save(function(err) {
            if(err) {
                return res.status(500).json({
                        message: 'Internal server error'
            })
        }
        })
    

    console.log(userprofile)
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash,
                email: email,
                profile: userprofile._id
            });

            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                return res.status(201).json({message: 'Registration Succesful'});
            });
        });
    });
    })
});

app.get('/*', function(req, res) {
    console.log('catch all route')
    console.log(req.user)
    res.sendFile(path.join(__dirname, './index.html'))
});

app.use(function(err, req, res, next) {
   res.send(err);
});


var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;