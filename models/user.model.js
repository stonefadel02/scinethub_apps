const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    validate(v){
        if (!validator.isLength(v)) throw new Error('Username no valide');
    }

  },
   fullname: {
    type:String,
    required: true,
    validate(v){
        if (!validator.isLength(v)) throw new Error('Fullname no valide');
    }
  },
   email: {
    type:String,
    required: true,
    validate(v){
        if (!validator.isEmail(v)) throw new Error('email no valide');
    }
  },
    password: {
    type:String,
    required: true,
    validate(v){
        if (!validator.isLength(v, {min: 4, max:20 })) throw new Error('password no valide');
    }
  },
})

userSchema.pre('save', async function(){
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

const User= mongoose.model('User', userSchema);
module.exports = User;