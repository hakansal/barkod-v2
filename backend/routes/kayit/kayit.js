
const express = require("express");
const Items = require("../../Db/models/items");
const tokencheck = require("../tokencheck");

const router = express.Router();

router.post("/kayit", tokencheck, async (req, res) => {
    try {

        const { barkod, isim, adet, fiyat } = req.body;
        if (!barkod || !isim || !adet || !fiyat) {
            return res.status(400).json("veri ekleyiniz");
        };
        const checkitem = await Items.findOne({ barkod: barkod });
        if (checkitem) {
            return res.status(400).json({ message: "aynı barkodda ürün var" });
        }
        if (!checkitem) {
            const item = await Items.create({ barkod: barkod, isim: isim, adet: adet, fiyat: fiyat });
            item.save();
           return res.status(200).json("kayıt edildi.");
        }


    } catch (err) {
        return res.status(400).json({ message: "hata", error: err });


    }
});
module.exports = router;

