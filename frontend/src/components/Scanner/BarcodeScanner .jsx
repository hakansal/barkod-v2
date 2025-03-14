import React, { useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected, onClose }) => {
  useEffect(() => {
    // Quagga konfigürasyonu: Kameradan gelen görüntü ve taranacak barkod tipleri.
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"), // Tarama alanı
          constraints: {
            facingMode: "environment", // Arka kamera
          },
        },
        decoder: {
          // Desteklemek istediğin barkod tiplerini buraya ekleyebilirsin.
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "upc_reader",
            "upc_e_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.error("Quagga init hatası:", err);
          return;
        }
        Quagga.start();
      }
    );

    // Barkod algılandığında çalışacak fonksiyon
    Quagga.onDetected(handleDetected);

    // Component unmount olduğunda temizle
    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, []);

  const handleDetected = (result) => {
    if (result && result.codeResult && result.codeResult.code) {
      onDetected(result.codeResult.code);
      onClose(); // Tarayıcı overlay'ını kapat
      Quagga.stop();
    }
  };

  return (
    <div className="scanner-overlay">
      <div className="scanner-container">
        <div id="barcode-scanner" style={{ width: "100%", height: "300px" }}></div>
        <button className="close-scanner" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
};

export default BarcodeScanner;
