const userModel = require("../models/userModels")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")

const getAllUser =(req,res)=>{
    res.send("User routes") 
}
   
const addUser =async(req,res)=>{
try {
    console.log("register testing")
        const userData =req.body
        const saltRounds=10
        let hashedPassword =await bcrypt.hash(userData.password,saltRounds)
        let newUser= new userModel({
            // email:userData.email,
            // password:userData.password,
            // userName:userData.userName,
            // role:userData.role,
            ...userData,
            password:hashedPassword,
        })
    
    
    await newUser.save()
        
    let messageData = {
        message:"User added successfully",
        status:200,
        data:newUser
    }
    res.status(200).send(messageData)

        console.log(userData)
    }
    
 catch (error) {
    let messageData ={
        message:error.message,
        status:404,
        error:error
    }
    res.status(404).send(messageData)
  }
}



const loginUser = async (req,res)=>{
    console.log("login testing")
    
    try {
        let loginUser =req.body
        
        let userData =await userModel.findOne({email:loginUser.email})
        // console.log(userData)
        if(userData){
            let isPasswordCorrect  =bcrypt.compare(loginUser.password,userData.password)
            // res.send(userData)
            
            if(isPasswordCorrect){
                let token = jwt.sign({
                    _id:userData._id,
                    role:userData.role,
                },'secret',{expiresIn :60*60})
                    
            
                console.log("user Info", userData)
                let messageData ={
                    message:"login successfull",
                    status:200,
                    data:{token, role:userData.role,email:userData.email,username:userData.userName}
                    
                }
                res.status(200).send(messageData)
            }        
        else{
            res.status(201).send("Invalid credentials")
        } 
    }
        else{
          res.status(201).send("User does not exist")

        }
    }
     
  catch (error) {
        
        let messageData ={
            message:error.message,
            status:404,
            error:error
        }
         res.status(404).send(messageData)
    }
}

const updateUser = async (req,res)=>{

    try {
        let userId =req.params.userId
        
        
        let enteredData = req.body
        // const userData =await userModel.findById(userId)
        

        let updateUser =await userModel.findByIdAndUpdate(userId,enteredData ,{new:true})
         res.send(updateUser)

    } catch (error) {
         let message =error.message.includes("Cast to ObjectId failed for value")? "Please provide correct Id":error.message
        messageData ={
            message:message,
            status:404,
            error:error
        }
        res.status(404).send(messageData)
    }
      
}

module.exports={getAllUser,addUser,loginUser,updateUser}