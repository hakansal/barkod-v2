const mongoose =require("mongoose");


const  Satismodel=new mongoose.Schema({

    gun:{
        type:Date,
        required:true,
         
    },
    satislar:[{
        barkod:{
            type:String,
            required:true
        },
        isim: {
            type: String,
            require: true,
        },
        fiyat: {
            type: Number,
            required: true,
        },
    }]

})
module.exports=mongoose.model("Satismodel",Satismodel);