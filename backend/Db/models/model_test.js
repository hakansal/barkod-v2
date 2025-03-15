const mongoose =require("mongoose");


const Model_test=new mongoose.Schema({


    gun:{
        type:Date,
        required:true,
         
    },
    satislar:[{
        satis_id:{
            type:String

        },
      satilanlar:[{
        barkod: {
            type: String,
            uniqe: true,
            required: true
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
    }]



})


module.exports =mongoose.model("Satis_Tes",Model_test)