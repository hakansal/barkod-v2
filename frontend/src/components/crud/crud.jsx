import React, { useState, useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./crud.css";

const QRScanner = ({ onScanSuccess, onClose }) => {
  useEffect(() => {
    // QR Scanner ayarları: fps ve qrbox boyutunu ayarlayabilirsiniz.
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    const scanner = new Html5QrcodeScanner("qr-reader", config, false);
    scanner.render(
      (decodedText, decodedResult) => {
        onScanSuccess(decodedText);
        scanner.clear(); // Tarayıcıyı temizle
      },
      (errorMessage) => {
        console.warn("QR tarama hatası:", errorMessage);
      }
    );

    // Component unmount olunca scanner temizle
    return () => {
      scanner.clear().catch((error) => {
        console.error("QR scanner temizlenirken hata:", error);
      });
    };
  }, [onScanSuccess]);

  return (
    <div className="scanner-overlay">
      <div className="scanner-container">
        <div id="qr-reader" style={{ width: "100%" }}></div>
        <button className="close-scanner" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
};

const Crud = () => {
  const [barkod, setBarkod] = useState("");
  const [isim, setIsim] = useState("");
  const [adet, setAdet] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

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
        // Inputları temizle
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

  // QR tarayıcıdan gelen veriyi barkod inputuna aktar
  const handleScanSuccess = (data) => {
    setBarkod(data);
    setScanning(false);
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

      {/* Eğer scanning aktifse, QRScanner bileşenini göster */}
      {scanning && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setScanning(false)}
        />
      )}
    </div>
  );
};

export default Crud;
