import React, { useState, useRef } from "react";
import axios from "axios";
import "./bul.css";

const Bul = () => {
  const [serverResponse, setServerResponse] = useState({});
  const [barkod, setBarkod] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const getResponse = async (e) => {
    e.preventDefault();
    setLoading(true);

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
          <input
            ref={inputRef}
            onChange={(e) => setBarkod(e.target.value)}
            value={barkod}
            className="bul-input-field"
            type="text"
            placeholder="Barkod giriniz..."
          />
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
