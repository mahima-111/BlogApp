import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type: String,
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword= async function(enteredPassword){
    const isMatch=await bcrypt.compare(enteredPassword,this.password);
    return isMatch;
}

const User = mongoose.model('user', userSchema);
export default User;
