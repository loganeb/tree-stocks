const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    joined: {
        type: Date,
        default: Date.now
    },
    watchlist: [{
        type: String
    }],
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.methods.isValidPassword = async function(password){
    const compare = await bcrypt.compare(password, this.password);
    
    return compare;
}

module.exports = mongoose.model('User', UserSchema);