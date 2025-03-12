import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";
import { useNavigate } from "react-router-dom";


const List = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState(0);
  const [adet, setAdet] = useState(0);
  const [loading, setLoading] = useState(true);
  const [barkods, setBarkods] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/giris");
    }
  }, [navigate]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(
          "https://barkod-v2.onrender.com/serverapp/listele",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response?.data?.items) {
          const productItems = response.data.items;
          setItems(productItems);
          setFilteredItems(productItems); // ilk yüklemede tüm ürünler gösteriliyor.
          setAdet(response.data.adet);
          setPrice(response.data.price);

          const barkodSet = new Set(productItems.map((item) => item.barkod));
          setBarkods(barkodSet.size);
          setTimeout(()=>{
            setLoading(false)
          },500);

        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        // Ürün bilgileri geldikten sonra, görseller ayrı yüklense bile loading kapatılsın.
      
      }
    };

    getItems();
  }, [navigate]);



  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = items.filter((item) =>
      item.isim.toLowerCase().includes(query) || item.barkod.includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="mainlist">
      <div className="list-header">
        <h1>Ürün Listesi</h1>
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <div className="summary">
          <div className="summary-item">
            <h2>Toplam Ürün: {adet}</h2>
          </div>
          <div className="summary-item">
            <h2>Toplam Fiyat: {price} TL</h2>
          </div>
          <div className="summary-item">
            <h2>Ürün Çeşidi: {barkods}</h2>
          </div>
        </div>
      </div>

      {loading ? (
  <div className="spinner"></div>
) : (
  <div className="displaylist">
    <ul className="list">
      {filteredItems.map((item) => (
        <div className="listitem" key={item._id}>
          <div className="item-infol">
            <p className="item-barkod">{item.barkod}</p>
            <p className="item-name">{item.isim}</p>
            <p className="item-adet">{item.adet} Adet</p>
            <p className="item-price">{item.fiyat} TL</p>
          </div>
        </div>
      ))}
    </ul>
  </div>
)}
    </div>
  );
};

export default List;
