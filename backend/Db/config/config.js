
const mongoose=require("mongoose");
require("dotenv").config();

const Connect=async()=>{try {
    
     await mongoose.connect(process.env.DB_URL);
     console.log("connectted to db");
} catch (error) {
    console.log("cannot connect to db",error);
}

}
 module.exports= Connect;
