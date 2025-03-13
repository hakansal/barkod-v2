import React, { useState } from "react";
import "./update.css";
import axios from "axios";

const Update = () => {
  const [barkod, setBarkod] = useState("");
  const [isim, setIsim] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [adet, setAdet] = useState("");
  const [item, setItem] = useState(null);

  const findData = async (e) => {
    e.preventDefault();
    if (!barkod) {
      alert("Lütfen barkod giriniz.");
      return;
    }
    try {
      const response = await axios.post(
        "https://barkod-v2.onrender.com/serverapp/bul",
        { barkod },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setItem(response.data.item);
    } catch (error) {
      alert("Ürün bulunamadı.");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    const data = {
      barkod,
      isim: isim || undefined,
      fiyat: fiyat || undefined,
      adet: adet || undefined,
    };

    try {
      const response = await axios.post(
        "https://barkod-v2.onrender.com/serverapp/guncelle",
        data,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.status === 200) {
        alert("Güncelleme başarılı!");
      }
    } catch (error) {
      alert(error.response?.data || "Sunucu hatası.");
    }
  };

  return (
    <div>
      <div className="mainupdate">
        <div className="inputupdate">
          <form className="form">
            <div className="divinput">
              <label className="label">Barkod</label>
              <input
                onChange={(e) => setBarkod(e.target.value)}
                type="text"
                placeholder="Barkod"
                className="input"
              />
            </div>

            <div className="divinput">
              <label className="label">İsim</label>
              <input
                onChange={(e) => setIsim(e.target.value)}
                type="text"
                placeholder="İsim"
                className="input"
              />
            </div>

            <div className="divinput">
              <label className="label">Fiyat</label>
              <input
                onChange={(e) => setFiyat(e.target.value)}
                type="text"
                placeholder="Fiyat"
                className="input"
              />
            </div>

            <div className="divinput">
              <label className="label">Adet</label>
              <input
                onChange={(e) => setAdet(e.target.value)}
                type="text"
                placeholder="Adet"
                className="input"
              />
            </div>

            <button onClick={findData} type="submit" className="button">
              Bul
            </button>
          </form>
        </div>
        {item && (
          <div className="bul">
            <p>İsim: {item?.isim || "Bilinmiyor"}</p>
            <p>adet: {item?.adet || "Bilinmiyor"}</p>
            <p>fiyat: {item?.fiyat || "Bilinmiyor"}</p>

            <button onClick={sendData} className="button">
              Güncelle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;
