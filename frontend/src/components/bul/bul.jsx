import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./bul.css";

const Bul = () => {
  const [serverResponse, setServerResponse] = useState({});
  const [barkod, setBarkod] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [scannerError, setScannerError] = useState(""); // Add error state

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "barcode-scanner", // ID of the div where the scanner is shown
        { fps: 10, qrbox: 250 }
      );

      // Start scanning
      scanner.render(
        (decodedText) => {
          setBarkod(decodedText); // Set the scanned barcode to the state
          scanner.clear(); // Clear the scanner
          setScanning(false); // Stop scanning
        },
        (error) => {
          setScannerError("Barkod okunamadı. Lütfen tekrar deneyin.");
          console.error("Barkod okunamadı:", error);
        }
      );

      return () => scanner.clear(); // Clean up when the component unmounts
    }
  }, [scanning]); // Effect runs when scanning state changes

  const getResponse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setScannerError(""); // Reset scanner error message

    if (!barkod) {
      setLoading(false);
      return alert("Lütfen barkod ekleyiniz");
    }

    try {
      const response = await axios.post(
        "https://barkod-v2.onrender.com/serverapp/bul",
        { barkod },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response && response.data.item) {
        setServerResponse(response.data.item);
      } else {
        alert("Hata: Geçerli veri alınamadı");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Barkod hatalı veya bulunamadı.");
      } else {
        alert(`Sunucu hatası: ${error.response?.status || "Bilinmiyor"}`);
      }
    } finally {
      setLoading(false);
      setBarkod("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="bul-container">
      <div className="bul-input">
        <form className="bul-form" onSubmit={getResponse}>
          <label className="bul-label">Barkod</label>
          <div className="barkod-input-wrapper">
            <input
              ref={inputRef}
              onChange={(e) => setBarkod(e.target.value)}
              value={barkod}
              className="bul-input-field"
              type="text"
              placeholder="Barkod giriniz..."
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
          {scannerError && <div className="scanner-error">{scannerError}</div>} {/* Display scanner error */}

          <button className="bul-button" type="submit">
            Bul
          </button>
          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          )}
        </form>
      </div>

      <div className="bul-response">
        {serverResponse.isim ? (
          <div className="response-content">
            {`${serverResponse.isim} - ${serverResponse.adet} adet - ${serverResponse.fiyat}₺`}
          </div>
        ) : (
          <p className="response-placeholder">Ürünler burada görüntülenecek.</p>
        )}
      </div>
    </div>
  );
};

export default Bul;
