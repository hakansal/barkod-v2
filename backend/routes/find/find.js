const express = require("express");
const router = express.Router();
const Items = require("../../Db/models/items");
const tokencheck=require("../tokencheck");


router.get("/bul",tokencheck, async (req, res) => {
    try {
        const {barkod}=req.body;
        const item = await Items.findOne({barkod:barkod});
        return  res.status(200).json(item);
    } catch (err) {

        return   res.status(400).json({ message: "hata", error: err.message });

    }
});

module.exports = router;