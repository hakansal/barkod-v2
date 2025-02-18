
const mongoose = require("mongoose");

const Items = new mongoose.Schema({
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
    adet: {
        type: Number,
        required: true
    },
    


})
module.exports = mongoose.model("Items", Items);