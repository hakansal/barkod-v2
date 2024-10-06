const express = require("express");
const Items = require("../../Db/models/items");
const tokencheck = require("../tokencheck");

const router = express.Router();

router.post("/satis", tokencheck, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json("Veri eklemediniz");
    }

    for (let i = 0; i < items.length; i++) {
      const item = await Items.findOne({ barkod: items[i] });

      if (!item) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${items[i]}` });
      }

      if (item.adet <= 0) {
        return res.status(400).json({ message: `Stokta yeterli adet yok: ${item.barkod}` });
      }

      item.adet -= 1;  
      await item.save(); 
    }

    return res.status(200).json("Satış yapıldı");
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

module.exports = router;
