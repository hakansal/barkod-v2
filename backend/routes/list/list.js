const express = require("express");
const router = express.Router();
const Items = require("../../Db/models/items");
const tokencheck=require("../tokencheck");


router.get("/listele",tokencheck, async (req, res) => {
    try {

        const items = await Items.find();
        res.status(200).json(items);
    } catch (err) {

        res.status(400).json({ message: "hata", error: err });

    }
});

module.exports = router;