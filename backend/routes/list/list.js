const express = require("express");
const router = express.Router();
const Items = require("../../Db/models/items");
const tokencheck = require("../tokencheck");

router.get("/listele", tokencheck, async (req, res) => {
    try {
       
        let price = 0;
        let adet=0;
        const items = await Items.find();
        fullitems = items;
        for (let i = 0; i < fullitems.length; i++) {
            price = price + items[i].fiyat*items[i].adet;
            adet=adet+items[i].adet;
        }
        const data = {
            items: items,
            price: price,
            adet:adet
        }

        res.status(200).json(data);
    } catch (err) {

        res.status(400).json({ message: "hata", error: err });

    }
});

module.exports = router;