const express = require("express");
const Items = require("../../Db/models/items");
const tokencheck = require("../tokencheck");
const Satismodel = require("../../Db/models/gunlukkayit");

const router = express.Router();

router.post("/satis", tokencheck, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Veri eklemediniz" });
    }

    // 1️⃣ Ürünleri Kontrol Et ve Stoktan Düş
    const satislar = [];
    for (const barkod of items) {
      const item = await Items.findOne({ barkod });
      if (!item) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${barkod}` });
      }
      if (item.adet <= 0) {
        return res.status(400).json({ message: `Stokta yeterli adet yok: ${barkod}` });
      }

      // Stoktan 1 adet düş
      item.adet -= 1;
      await item.save();

      // Satış kaydı için veri hazırla
      satislar.push({
        barkod: item.barkod,
        isim: item.isim,
        fiyat: item.fiyat
      });
    }

    // 2️⃣ Günlük Kaydı Kontrol Et veya Oluştur
    const today = new Date();
    const todayStr = today.toDateString();

    let gkayit = await Satismodel.findOne({ gun: { $gte: new Date(todayStr) } });

    if (gkayit) {
      // Aynı güne satış ekle
      gkayit.satislar.push(...satislar);
      await gkayit.save();
    } else {
      // Yeni günlük kayıt oluştur
      await Satismodel.create({ gun: today, satislar });
    }

    // ✅ Başarılı Satış Mesajı
    res.status(200).json({ message: "Satış başarıyla tamamlandı", satislar });

  } catch (error) {
    console.error("Satış hatası:", error);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

module.exports = router;
