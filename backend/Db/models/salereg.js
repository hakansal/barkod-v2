const mongoose = require("mongoose");

const Salereg = new mongoose.Schema({
  gun: {
    type: String,
    required: true,
    unique: true,
  },
  satislar: [
    {
      satis: 
        {
          type: String,  
          required: true,
          urunler:[
            
          ]
        },
      
    },
  ],
});

module.exports = mongoose.model("Salereg", Salereg);
