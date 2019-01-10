const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const config = require('../config');

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies[config.jwtName];
    }
    return token;
}

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done){
    console.log('Authenticating ' + username);
    
    return User.findOne({username: username}, async(err, user) => {
        if(err) return done(err);

        const validate = await user.isValidPassword(password);
        if( !validate ){
            return done(null, false, {message: 'Invalid username or password.'});
        }

        //If login info is correct, return object containing username, 
        //id and token exp date
        return done(null, {
            username: user.username, 
            _id: user._id, 
            exp: Date.now()+(3*24*60*60*1000)
        }, {message: 'Login successful.'});        
    })
}));


passport.use(new JWTstrategy({
    secretOrKey: process.env.TOKEN_SECRET,
    jwtFromRequest: cookieExtractor,
    passReqToCallback: true
}, (req, token, done) => {
    if(token.exp < Date.now()){
        let error = new Error('Token expired.');
        return done(error);
    }
    req._id = token._id;
    req.username = token.username;
    return User.findOne({_id: token._id}, (err, user) =>{
        if(err) return done(err);
        return done(null, {username: user.username, _id: user._id});
    });
}));