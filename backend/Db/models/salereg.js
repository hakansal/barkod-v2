const mongoose =require("mongoose")


const Salereg=new mongoose.Schema({

    gun:{
        type:Date,
        required:true,
        unique:true
    },

    items:[{
        type:String,
        required:true,

    }]
})


module.exports=mongoose.model("Salereg",Salereg);