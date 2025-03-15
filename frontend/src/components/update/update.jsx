import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./update.css";
import axios from "axios";

const Update = () => {
  const [barkod, setBarkod] = useState("");
  const [isim, setIsim] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [adet, setAdet] = useState("");
  const [item, setItem] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "barcode-scanner",
        { fps: 10, qrbox: 250 }
      );

      scanner.render(
        (decodedText) => {
          setBarkod(decodedText);
          scanner.clear();
          setScanning(false);
        },
        (error) => {
          console.error("Barkod okunamadı:", error);
        }
      );

      return () => scanner.clear();
    }
  }, [scanning]);

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
      setIsim(response.data.item.isim || "");
      setAdet(response.data.item.adet || "");
      setFiyat(response.data.item.fiyat || "");
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
    } finally {
      setBarkod("");
    }
  };

  return (
    <div>
      <div className="mainupdate">
        <div className="inputupdate">
          <form className="form">
            <div className="divinput">
              <label className="label">Barkod</label>
              <div className="barkod-input-wrapper">
                <input
                  value={barkod}
                  onChange={(e) => setBarkod(e.target.value)}
                  type="text"
                  placeholder="Barkod"
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => setScanning(true)}
                  className="camera-button"
                  title="Barkod okut"
                >
                  📷
                </button>
              </div>
              {scanning && <div id="barcode-scanner"></div>}
            </div>

            <div className="divinput">
              <label className="label">İsim</label>
              <input
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
                type="text"
                placeholder="İsim"
                className="input"
              />
            </div>

            <div className="divinput">
              <label className="label">Fiyat</label>
              <input
                value={fiyat}
                onChange={(e) => setFiyat(e.target.value)}
                type="text"
                placeholder="Fiyat"
                className="input"
              />
            </div>

            <div className="divinput">
              <label className="label">Adet</label>
              <input
                value={adet}
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
            <p className="label">İsim: {item?.isim || "Bilinmiyor"}</p>
            <p className="label">Adet: {item?.adet || "Bilinmiyor"}</p>
            <p className="label">Fiyat: {item?.fiyat || "Bilinmiyor"}</p>

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