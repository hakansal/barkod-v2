const express = require("express");
const Items = require("../../Db/models/items");
const router = express.Router();
const tokencheck=require("../tokencheck");



router.post("/guncelle",tokencheck, async (req, res) => {

    try {
        const { barkod, adet, isim, fiyat } = req.body;
        if (!barkod || !adet || !isim || !fiyat) {
           return  res.status(400).json("veri eklemediniz");
        };
        const item = await Items.findOne({ barkod: barkod });
        if (!item) {
          return  res.status(400).json("barkodda hata veya böyle bir ürün yok");

        };
        if (item) {
            await item.updateOne({ adet: adet, isim: isim, fiyat: fiyat });
            item.save();
          return  res.status(200).json("güncelleme yapıldu");

        };
    } catch (err) {
       return res.status(400).json({ message: "hata", error: err });
    }
});

module.exports = router;