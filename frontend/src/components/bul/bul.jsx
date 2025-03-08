import React, { useState } from "react";
import axios from "axios";
import "./bul.css";

const Bul = () => {
  const [serverresponse, setServerResponse] = useState({});
  const [barkod, setBarkod] = useState("");
  const [loading, setLoading] = useState(false);
  const getResponse = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!barkod) {
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
        
          setLoading(false);
     
      } else if (response.status == 400) {
        alert("barkod da hata var");
      }
      else {
        alert("Hata: Geçerli veri alınamadı");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        alert("Barkod hatalı veya bulunamadı.");
      } else {
        alert(`Sunucu hatası: ${error.response.status}`);
      }

    }
  };

  return (
    <div className="bul-container">
      <div className="bul-input">
        <form className="bul-form" onSubmit={getResponse}>
          <label className="bul-label">Barkod</label>
          <input
            onChange={(e) => setBarkod(e.target.value)}
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
        {serverresponse.isim ? (
          <div className="response-content">
            {`${serverresponse.isim} - ${serverresponse.adet} adet - ${serverresponse.fiyat}₺`}
          </div>
        ) : (
          <p className="response-placeholder">ürünler.</p>
        )}
      </div>
    </div>
  );
};

export default Bul;
