const express = require("express");
const Items = require("../../Db/models/items");
const router = express.Router();
const tokencheck = require("../tokencheck");

router.post("/guncelle", tokencheck, async (req, res) => {
  try {
    const { barkod, adet, isim, fiyat } = req.body;

    if (!barkod) {
      return res.status(400).json("Barkod bilgisi eksik.");
    }

    const item = await Items.findOne({ barkod });
    if (!item) {
      return res.status(404).json("Ürün bulunamadı.");
    }

    const updateData = {};
    if (adet) updateData.adet = adet;
    if (isim) updateData.isim = isim;
    if (fiyat) updateData.fiyat = fiyat;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json("Güncellenecek değer girilmedi.");
    }

    await item.updateOne(updateData);
    return res.status(200).json("Güncelleme başarılı.");
  } catch (err) {
    return res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

module.exports = router;
