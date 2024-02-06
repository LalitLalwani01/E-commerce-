const { default: mongoose } = require("mongoose")

const connnectDb= ()=>{
try {
        // throw new error ("my error ")
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("connected to db" )
        })
    }
    
 catch (error) {
    console.log("not connected",error);
    process.exit(1)
  }
}

module.exports= connnectDb