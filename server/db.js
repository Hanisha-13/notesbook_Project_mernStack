const mongoose =require("mongoose");

const connectDb = async()=>{
    try{
             await mongoose.connect(process.env.MONGODB_URL);
            console.log("Db connected successfully");
    }catch(err){
        console.error("Db error",err)
    }
}

module.exports=connectDb; 