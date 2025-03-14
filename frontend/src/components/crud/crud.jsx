import React, { useState, useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./crud.css";

const Crud = () => {
  const [barkod, setBarkod] = useState("");
  const [isim, setIsim] = useState("");
  const [adet, setAdet] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [loading, setLoading] = useState(false);
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

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!barkod || !isim || !adet || !fiyat) {
      alert("Lütfen tüm alanları doldurun!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://barkod-v2.onrender.com/serverapp/kayit",
        { barkod, isim, adet, fiyat },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        alert("Kayıt başarılı!");
        setBarkod("");
        setIsim("");
        setAdet("");
        setFiyat("");
      } else {
        alert("Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      alert(
        `Hata: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="maincrud">
      <div className="crudinput">
        <form className="form">
          <div className="divdorm">
            <label className="label">Barkod</label>
            <div className="barkod-input-wrapper">
              <input
                value={barkod}
                onChange={(e) => setBarkod(e.target.value)}
                placeholder="Barkod"
                className="input"
                type="text"
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

          <div className="divdorm">
            <label className="label">İsim</label>
            <input
              value={isim}
              onChange={(e) => setIsim(e.target.value)}
              placeholder="İsim giriniz"
              className="input"
              type="text"
            />
          </div>
          <div className="divdorm">
            <label className="label">Fiyat</label>
            <input
              value={fiyat}
              onChange={(e) => setFiyat(e.target.value)}
              placeholder="Fiyat"
              className="input"
              type="number"
            />
          </div>
          <div className="divdorm">
            <label className="label">Adet</label>
            <input
              value={adet}
              onChange={(e) => setAdet(e.target.value)}
              placeholder="Adet"
              className="input"
              type="number"
            />
          </div>

          <button onClick={sendData} className="button">
            {loading ? "Kayıt ediliyor..." : "Kayıt et"}
          </button>
        </form>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crud;
