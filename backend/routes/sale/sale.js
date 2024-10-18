const express = require("express");
const Items = require("../../Db/models/items");
const tokencheck = require("../tokencheck");
const Salereg = require("../../Db/models/salereg");
require('date-fns');

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

      // Stoktan bir adet düş
      item.adet -= 1;  
      await item.save();
    }

    // Satış günü için kayıt kontrolü
    const date = new Date().toLocaleDateString();
    let checksalereg = await Salereg.findOne({ gun: date });

    if (!checksalereg) {
      // Gün için kayıt yoksa yeni kayıt oluştur
      checksalereg = await Salereg.create({ gun: date, satislar: [{ satis: items }] });
      await checksalereg.save();
      return res.status(201).json({ message: "Yeni satış kaydı oluşturuldu", data: checksalereg });
    } else {
      // Mevcut kayda ürünleri ekle
      await checksalereg.updateOne(
        { gun: date }, // Belirli bir günü arıyoruz
        { 
          $push: { satislar: { satis: items } } // items dizisini satis dizisine ekliyoruz
        },
        { new: true }
      );

      return res.status(200).json({ message: "Satış kaydı güncellendi", data: checksalereg });
    }

  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

module.exports = router;
