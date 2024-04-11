import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    posts: [
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Posts"
    }]
});
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema);

export default User;