require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var unless = require('express-unless');
var cors = require('cors');
var unirest = require('unirest');

var config = require('./config');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user-model');
var Post = require('./models/post-model');
var UserProfile = require('./models/user-profile-model');

const socket = require('socket.io');
const http = require('http');
const server = http.Server(app); 
const io = socket(server);

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.post('/users/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    const token = jwt.sign({
        username: req.user.username,
        _id: req.user._id
    }, config.jwtSecret);
    res.json({ token });
  });
  
app.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/search/profile', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    if(req.body.search == '') {
        res.json([])
    }
    UserProfile.find({username: new RegExp(req.body.search, "i")}).exec(function(err, userprofile) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(userprofile);
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/profile', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}).populate({path: 'outgoingRequests', select:'ProfilePicture username'}).populate({path: 'incomingRequests', select:'ProfilePicture username'}).populate({path: 'Friends', select:'ProfilePicture username onlineStatus'}).exec(function(err, userprofile) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(userprofile);
    });
});

app.get('/api/profile/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
     UserProfile.findOne({username: req.params.username}).populate({path: 'posts', populate: {path: 'profile', select:'ProfilePicture'}}).populate({path: 'Friends', select:'ProfilePicture username'}).exec(function(err, userprofile) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        var safeData = userprofile;
        if(req.params.username === req.user.username) {
            res.json(userprofile);
        }
        else {
            safeData = safeData.toObject();
            delete safeData.incomingRequests;
            delete safeData.outgoingRequests;
            res.json(safeData);
        }
    });
});

app.put('/api/profile/picture/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
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
    Post.find({}).populate('profile', 'ProfilePicture').populate('comments.profile', 'ProfilePicture').exec(function(err, post) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
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
    UserProfile.findOne({username: req.user.username}).exec(function(err, userprofile) {
      if(err) {
          return res.json({message: 'Internal Server Error'});
      }
      Post.create({content: req.body.content, image: req.body.image, profile: userprofile._id, name:req.user.username, date: Date.now()}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
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
                return req.params.id == singlePost;
            });
            if(postIndex > -1) {
                userprofile.posts.splice(postIndex, 1);
            }
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
app.post('/api/friend/add/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    /// check whether user object
    UserProfile.findOne({username: req.user.username}).exec(function(err, userprofile) {
      if(err) {
          return res.json({message: 'Internal Server Error'});
      }
      UserProfile.findOne({username: req.params.username}).exec(function(err, seconduserprofile) {
          if(err) {
              return res.json({message: 'Internal Server Error'});
          }
      userprofile.outgoingRequests.push(seconduserprofile._id);
      seconduserprofile.incomingRequests.push(userprofile._id);
      userprofile.save(function(err) {
        if(err) {
            return res.json({message: 'Internal Server Error'});
        }
        seconduserprofile.save(function(err) {
            if(err) {
            return res.json({message: 'Internal Server Error'});
            }
          res.json(userprofile);  
        })
        })
        })
    })
});

app.put('/api/friend/confirm/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        UserProfile.findOne({username: req.params.username}).exec(function(err, seconduserprofile) {
          if(err) {
              return res.json({message: 'Internal Server Error'});
          }
          var firstIndex = userprofile.outgoingRequests.findIndex(function(profile) {
              return seconduserprofile._id == profile._id
          })
          var secondIndex = seconduserprofile.incomingRequests.findIndex(function(profile) {
              return userprofile._id == profile._id
          })
          userprofile.incomingRequests.splice(firstIndex, 1);
          seconduserprofile.outgoingRequests.splice(secondIndex, 1);
          
          userprofile.Friends.push(seconduserprofile._id);
          seconduserprofile.Friends.push(userprofile._id);
          
          userprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             seconduserprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             res.status(200).json(userprofile);
             });
          });
        })
    })
});

app.put('/api/friend/cancel/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        UserProfile.findOne({username: req.params.username}).exec(function(err, seconduserprofile) {
          if(err) {
              return res.json({message: 'Internal Server Error'});
          }
          var firstIndex = userprofile.outgoingRequests.findIndex(function(profile) {
              return seconduserprofile._id == profile._id
          })
          var secondIndex = seconduserprofile.incomingRequests.findIndex(function(profile) {
              return userprofile._id == profile._id
          })
          userprofile.outgoingRequests.splice(firstIndex, 1);
          seconduserprofile.incomingRequests.splice(secondIndex, 1);
          
          userprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             seconduserprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             res.status(200).json(userprofile);
             });
          });
        })
    })
});

app.put('/api/friend/deny/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        UserProfile.findOne({username: req.params.username}).exec(function(err, seconduserprofile) {
          if(err) {
              return res.json({message: 'Internal Server Error'});
          }
          var firstIndex = userprofile.outgoingRequests.findIndex(function(profile) {
              return seconduserprofile._id == profile._id
          })
          var secondIndex = seconduserprofile.incomingRequests.findIndex(function(profile) {
              return userprofile._id == profile._id
          })
          userprofile.incomingRequests.splice(firstIndex, 1);
          seconduserprofile.outgoingRequests.splice(secondIndex, 1);
          
          userprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             seconduserprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             res.status(200).json(userprofile);
             });
          });
        })
    })
});

app.put('/api/friend/remove/:username', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        UserProfile.findOne({username: req.params.username}).exec(function(err, seconduserprofile) {
          if(err) {
              return res.json({message: 'Internal Server Error'});
          }
          var firstIndex = userprofile.outgoingRequests.findIndex(function(profile) {
              return seconduserprofile._id == profile._id
          })
          var secondIndex = seconduserprofile.incomingRequests.findIndex(function(profile) {
              return userprofile._id == profile._id
          })
          userprofile.Friends.splice(firstIndex, 1);
          seconduserprofile.Friends.splice(secondIndex, 1);
          
          userprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             seconduserprofile.save(function(err) {
             if(err) {
                 return res.json({message: 'Internal Server Error'});
             }
             res.status(200).json(userprofile);
             });
          });
        })
    })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/comments/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
        	if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        	}
	        post.comments.push({comment: req.body.comment, username: req.user.username, date: Date.now(), post: req.params.id, profile: userprofile._id});
	        post.save(function(err) {
	        if(err) return res.json({message: err})
	          res.json(post);  
	        })
        })        
    })
});

app.put('/api/comments/:postid/:commentid', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Post.findOne({_id: req.params.postid}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        
        var returnIndex = post.comments.findIndex(function(comment) { 
            return comment._id == req.params.commentid;
        });
        if(returnIndex < 0) {
            //remove like
            return res.json({message: 'Server error finding comment'});
        }
        else {
            //add like
            post.comments[returnIndex].comment = req.body.comment;
        }
        post.save(function(err) {
            if(err) return res.send(err);
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
        
        var returnIndex = post.comments.findIndex(function(comment) { 
            return comment._id == req.params.commentid;
        });
        if(returnIndex < 0) {
            //remove like
            return res.json({message: 'Server error finding comment'});
        }
        else {
            //add like
            post.comments.splice(returnIndex, 1);
        }
        post.save(function(err) {
            if(err) return res.send(err);
            res.json(post);
        });
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/message/:friend', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
	      if(err) {
	          return res.json({message: 'Internal Server Error'});
	      }
          var firstIndex = userprofile.messages.findIndex(function(friend) {
          	return friend.friend === req.params.friend
          })
          if(firstIndex > -1) {
          	res.json(userprofile.messages[firstIndex]);
          }
          else {
          	return res.json({message: 'No chat history with this user'})
          }
      })
    })

app.post('/api/message', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    UserProfile.findOne({username: req.user.username}, function(err, userprofile) {
	      if(err) {
	          return res.json({message: 'Internal Server Error'});
	      }
          var firstIndex = userprofile.messages.findIndex(function(friend) {
          	console.log(friend.friend, 'friend---fruebd', 'req----', req.body.friend)
          	return friend.friend === req.body.friend
          })
          if(firstIndex > -1) {
          	userprofile.messages[firstIndex].messages.push(req.body)
          }
          else {
          	userprofile.messages.push({friend: req.body.friend, messages: [req.body]});
          }
          userprofile.save(function(err) {
	        if(err) {
	            return res.json({message: 'Internal Server Error'});
	        }
	    })
          console.log(userprofile.messages, 'first profiles messages')
      })
     UserProfile.findOne({username: req.body.friend}, function(err, seconduserprofile) {
          if(err) {
              return res.json({message: 'Internal Server Error'});
          }
            var secondIndex = seconduserprofile.messages.findIndex(function(friend) {
            	console.log(friend.friend, 'friend---fruebd', 'req----', req.body.friend)
          	return friend.friend === req.body.username
          })
          if(secondIndex > -1) {
          	seconduserprofile.messages[secondIndex].messages.push(req.body)
          }
          else {
          	seconduserprofile.messages.push({friend: req.body.username, messages: [req.body]});
          }
          seconduserprofile.save(function(err) {
            if(err) {
            return res.json({message: 'Internal Server Error'});
            }
            console.log(seconduserprofile.messages, 'second profiles messages')
          res.json(seconduserprofile);  
        })
        })
    })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/likes/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {

    Post.findOne({_id: req.params.id}, function(err, post) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        
    var returnIndex = post.likes.findIndex(function(user) { 
        return user.username == req.user._id;
    });
    if(returnIndex > -1) {
        //remove like
        post.likes.splice(returnIndex, 1);
    }
    else {
        //add like
        post.likes.push({username: req.user._id, like: true})
    }
    post.save(function(err) {
        if(err) return res.send(err);
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
    
    UserProfile.create({username: req.body.username}, function(err, userprofile) {
        if(err) {
            return res.json({message: 'Internal Server Error'});
        }
        userprofile.save(function(err) {
            if(err) {
                return res.status(500).json({
                        message: 'Internal server error'
            })
        }
        })
    
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
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.use(function(err, req, res, next) {
   res.send(err);
});

io.on('connection', function(socket) {  
     console.log('a user connected')
     socket.on('user-online', function(username) {
      	socket.join(username);
      	socket.username = username;
      	if(username) {
      		UserProfile.findOne({username: username}, function(err, userprofile) {
      		if(err) {
      			console.log('error finding profile')
      			return err;
      		}
      		userprofile.onlineStatus = true;
      		userprofile.save(function(err) {
      			if(err) {
      				console.log('error saving profile')
      				return err;
      			}
      			console.log('profile saved', userprofile)
      		})
      	})
      	}
      	socket.broadcast.emit('friend-online', username);
     });
     socket.on('private-chat', function(generatedRoom) {
      socket.join(generatedRoom);
     })
     socket.on('private-chat-message', function(values) {
      socket.broadcast.to(values.channelID).emit('private-chat-message', {username: values.username, friend: values.friend, message: values.message, channelID: values.channelID, image: values.image});
     })
     socket.on('chat-started', function(chatData) {
      socket.join(chatData.roomName)
      socket.broadcast.to(chatData.friend).emit('chat-started', chatData);
     })
     socket.on('join-private-chat', function(roomName) {
      socket.join(roomName)
     })
     socket.on('friend-request', function(otherUsername, requestUsername, profilePicture) {
     	socket.broadcast.to(otherUsername).emit('friend-request', requestUsername, profilePicture)
     })
     socket.on('accept-friend-request', function(otherUsername, requestUsername) {
     	socket.broadcast.to(otherUsername).emit('accept-friend-request', requestUsername)
     })
     socket.on('cancel-friend-request', function(otherUsername, requestUsername) {
     	socket.broadcast.to(otherUsername).emit('cancel-friend-request', requestUsername)
     })
     socket.on('deny-friend-request', function(otherUsername, requestUsername) {
     	socket.broadcast.to(otherUsername).emit('deny-friend-request', requestUsername)
     })
     socket.on('remove-friend', (otherUsername, requestUsername) => {
        socket.broadcast.to(otherUsername).emit('remove-friend', requestUsername)
        })
     socket.on('disconnect', function() {
     	if(socket.username) {
     	UserProfile.findOne({username: socket.username}, function(err, userprofile) {
      		if(err) {
      			return err;
      		}
      		userprofile.onlineStatus = false;
      		userprofile.save(function(err) {
      			if(err) {
      				return err;
      			}
      		})
      	})
     }
     	socket.broadcast.emit('user-disconnected', socket.username)
     	//disconnect the user or change the online status of the user
     })
})


var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        server.listen(config.PORT, function() {
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