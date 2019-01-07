const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

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

        return done(null, {username: user.username, _id: user._id}, {message: 'Login successful.'});        
    })
}));

passport.use(new JWTstrategy({
    secretOrKey: process.env.TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

}, (token, done) => {
    return User.findOneById(token._id)
        .then((err, user)=> {
            return done(null, user)
        })
        .catch(err => {
            return done(err);
        })
}));