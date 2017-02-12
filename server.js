var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = require('./config');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user-model');
var Post = require('./models/post-model');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressJWT({
  secret: config.jwtSecret,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

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
    console.log(req.user);
    res.json({ token });
  });
  
app.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/post', function(req, res) {
    Post.find({}, function(err, post) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(req.user);
        res.json(post);
    });
});

app.get('/api/post/:id', function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post);
        res.json(post);
    })
});

app.post('/api/post', function(req, res) {

    Post.create({content: req.body.content, username: req.user._id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post);
        res.json(post);
    })
});

app.put('/api/post/:id', function(req, res) {
    Post.findOneAndUpdate({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(post);
    })
});

app.delete('/api/post/:id', function(req, res) {
    Post.findOneAndRemove({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(post);
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/comments/:id', function(req, res) {
    Post.find({_id: req.params.id}, function(err, post) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(req.user);
        res.json(post);
    });
});

app.post('/api/comments/:id', function(req, res) {
    Post.create({content: req.body.content, username: req.user._id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post);
        res.json(post);
    })
});

app.put('/api/comments/:postid/:commentid', function(req, res) {
    Post.findOneAndUpdate({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(post);
    })
});

app.delete('/api/comments/:postid/:commentid', function(req, res) {
    Post.findOneAndRemove({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(post);
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/likes/:id', function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post);
        res.json(post);
    })
});

app.post('/api/likes/:id', function(req, res) {

    Post.create({content: req.body.content, username: req.user._id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(post);
        res.json(post);
    })
});

app.put('/api/likes/:id', function(req, res) {
    Post.findOneAndUpdate({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(post);
    })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/*', function(req, res) {
    console.log(req.user)
    res.sendFile(path.join(__dirname, './index.html'))
});

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.jwtSecret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

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
                email: email
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