import React, { useEffect, useState } from "react";
import "./main.css";
import axios from "axios";

const Mainscreen = () => {
  
  const [satislar, setsatislar] = useState([]);
  const [toplamfiyat, setToplamfiyat] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const todayStr = today.toDateString();
        const data = {
          gun: todayStr
        };
        const response = await axios({
          method: "post",
          data: data,
          url: "https://barkod-v2.onrender.com/serverapp/gunlukkayit",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        if (response) {
          
          setsatislar(response.data.satislar || []);
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    getItem();
  }, []);

  useEffect(() => {
    const toplam = satislar.reduce((acc, item) => acc + item.fiyat, 0);
    setToplamfiyat(toplam);
  }, [satislar]);

  return (
    <div className="divmain">
      <div className="listsatis">
        <h2>Günlük Satış Kayıtları</h2>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : satislar?.length > 0 ? (
          satislar.map((item) => (
            <div key={item._id} className="satislar">
              <p>{`${item.isim}`}</p>
              <p>{`${item.barkod}`}</p>
              <div className="fiyat">{`${item.fiyat} TL`}</div>
            </div>
          ))
        ) : (
          <p>Bugün için satış kaydı bulunmamaktadır.</p>
        )}
      </div>

      <div className="satistoplam">
        <p>{`Toplam satış: ${toplamfiyat} TL`}</p>
      </div>
    </div>
  );
};

export default Mainscreen;
