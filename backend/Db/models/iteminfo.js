const mongoose = require("mongoose");

const Iteminfo = new mongoose.Schema({

    tarih: {
        type: Date,
        required: true,
        
    },
    miktar: {
        type: Number,
        required: true,
        
    }
   
})
module.exports = mongoose.model("Iteminfo", Iteminfo);