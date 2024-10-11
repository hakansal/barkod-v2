const express = require("express");
const router = express.Router();
const Items = require("../../Db/models/items");
const tokencheck=require("../tokencheck");


router.post("/bul",tokencheck, async (req, res) => {
    const data={item:""};
    try {
        const {barkod}=req.body;
        if(!barkod){
            return res.status(400).json("hata");
        }
        const item = await Items.findOne({barkod:barkod});
        if(!item){
            return res.status(400).json("hata");
            
        }
        data.item=item
        return  res.status(200).json(data);
    } catch (err) {

        return   res.status(400).json({ message: "hata", error: err.message });

    }
});

module.exports = router;