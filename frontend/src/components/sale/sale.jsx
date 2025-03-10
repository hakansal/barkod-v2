import React, { useState, useEffect } from "react";
import "./sale.css";
import axios from "axios";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const cx = process.env.REACT_APP_GOOGLE_CX;

const Sale = () => {
  const [barkod, setBarkod] = useState("");
  const [items, setItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [donesale, setDonesale] = useState(null);
  // Her ürünün görsel URL'sini saklamak için bir nesne kullanıyoruz:
  const [imgUrls, setImgUrls] = useState({});

  const getItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://barkod-v2.onrender.com/serverapp/bul",
        { barkod },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Görseli almak için Google Custom Search API'sine istek gönderiyoruz:
      const imgResponse = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${barkod}&cx=${cx}&key=${apiKey}&searchType=image`
      );

      let imageUrl = null;
      if (imgResponse.data.items && imgResponse.data.items.length > 0) {
        imageUrl = imgResponse.data.items[0].link;
      }
      // Barkod bilgisi unique kabul edildiği için, görsel URL'sini barkoda göre saklıyoruz:
      setImgUrls((prev) => ({ ...prev, [barkod]: imageUrl }));

      if (response?.data?.item) {
        const item = response.data.item;
        setSaleItems((prev) => [...prev, item.barkod]);
        setItems((prev) => [...prev, item]);
        setPrice((prev) => prev + item.fiyat);
      } else {
        alert("Ürün bulunamadı.");
      }
      setBarkod("");
    } catch (error) {
      console.error("Ürün getirirken hata oluştu:", error);
      alert("Ürün getirirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const saleItem = async () => {
    if (items.length === 0) {
      return alert("Lütfen ürün ekleyiniz");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://barkod-v2.onrender.com/serverapp/satis",
        { items: saleItems },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response) {
        setDonesale("success");
        saleIptal();
      }
    } catch (error) {
      setDonesale("error");
      alert("Satış işlemi sırasında hata oluştu.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saleIptal = () => {
    setSaleItems([]);
    setItems([]);
    setPrice(0);
    setImgUrls({});
  };

  const deleteItem = (index) => {
     
    const deletedBarkod = items[index].barkod;
  
  
    const newItems = items.filter((_, i) => i !== index);
    const newSaleItems = saleItems.filter((_, i) => i !== index);
  
     
    setPrice((prev) => prev - items[index].fiyat);
    setItems(newItems);
    setSaleItems(newSaleItems);
  
  
    if (!newItems.some((item) => item.barkod === deletedBarkod)) {
      setImgUrls((prev) => {
        const newImgUrls = { ...prev };
        delete newImgUrls[deletedBarkod];
        return newImgUrls;
      });
    }
  };
  

   
  useEffect(() => {
    if (donesale) {
      const timer = setTimeout(() => {
        setDonesale(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [donesale]);

  return (
    <div className="mainsale">
      <div className="sale-section">
        <div className="sale-input">
          <form onSubmit={getItem} className="sale-form">
            <input
              className="sale-input-field"
              type="text"
              value={barkod}
              onChange={(e) => setBarkod(e.target.value)}
              placeholder="Barkod giriniz"
            />
            <button className="sale-button" type="submit" disabled={loading}>
              Gönder
            </button>
          </form>
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>

      <div className="list-section">
        <ul className="sale-list">
          {items.map((item, index) => (
            <li key={index} className="sale-list-item">
              <img
                className="img"
                alt=""
                src={imgUrls[item.barkod] || "/default-image.png"}
              />
              <div className="item-info">
                <span className="item-name">{`Ürün: ${item.isim}`}</span>
                <span className="item-price">{`Fiyat: ${item.fiyat} TL`}</span>
              </div>
              <button onClick={() => deleteItem(index)} className="delete-button">
                Çıkar
              </button>
            </li>
          ))}
        </ul>
        {donesale && (
          <div className={`sale-message ${donesale}`}>
            {donesale === "success" ? "Satış yapıldı!" : "Satış yapılamadı!"}
          </div>
        )}
      </div>

      <div className="summary-section">
        <div className="action-buttons">
          <button className="sale-button" onClick={saleItem} disabled={loading}>
            Satış
          </button>
          <button
            className="sale-button cancel-button"
            onClick={saleIptal}
            disabled={loading}
          >
            İptal
          </button>
        </div>
        <label className="total-label">{`Toplam: ${price} TL`}</label>
      </div>
    </div>
  );
};

export default Sale;
