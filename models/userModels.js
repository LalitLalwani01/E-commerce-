const mongoose =require("mongoose")

const userSchema = mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["user","seller","admin"],default:"user"}
});

const userModel =mongoose.model("User",userSchema)
module.exports =userModel;