const mongoose = require("mongoose");

const Iteminfo = new mongoose.Schema({

    gun: {
        type: Date,
        required: true,
        unique: true
    },
    toplamsatis: {
        type: Number,
        required: true,
        unique: true
    }
    ,
    list: [{
        type: mongoose.SchemaTypes.ObjectId,
        items: [{
            type: String,
            require: true,

        }]
        , ref: "Items"
    }]

})
module.exports = mongoose.model("Iteminfo", Iteminfo);