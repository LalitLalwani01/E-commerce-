const jwt =require("jsonwebtoken")

const authCheck =async (req,res,next)=>{
    // console.log(req)
    try {
        let token =req.headers.authorization;
        if(!token){
            console.log(req.headers.authorization)
            res.send("Please provide token")

            return;
        }

        let result =await jwt.decode(token,"secret")
             console.log(result)

        req.userId = result._id;
        req.userRole =result.role;
        // console.log(result)
        // res.send(result)
        console.log(result)
    
        next();
    } catch (error) {
         res.send(error.message)
        
    }

}
module.exports =authCheck