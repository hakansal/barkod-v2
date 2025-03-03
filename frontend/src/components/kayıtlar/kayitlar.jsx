import React, { useEffect, useState } from "react";
import axios from "axios";
import "./kayitlar.css";

const Kayitlar = () => {
  const [data, setData] = useState([]);
  const [aylik, setAylik] = useState([]);  
  const [aylıktoplam, setAylıktoplam] = useState({});  
  const [gunlukToplam, setGunlukToplam] = useState([]);  

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get("https://barkod-v2.onrender.com/serverapp/aylik", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setData([]);
      }
    };

    getItem();
  }, []);

  useEffect(() => {
     
    const aylikToplamHesapla = {};

    data.forEach((item) => {
      const ay = new Date(item.gun).getMonth() + 1;  
      const toplamFiyat = item.satislar.reduce((acc, satis) => acc + satis.fiyat, 0);  

       
      if (aylikToplamHesapla[ay]) {
        aylikToplamHesapla[ay] += toplamFiyat;
      } else {
        aylikToplamHesapla[ay] = toplamFiyat;
      }
    });

  
    setAylıktoplam(aylikToplamHesapla);

    
    setAylik(Object.keys(aylikToplamHesapla).map(Number));

 
    const gunlukToplamlar = data.map((item) =>
      item.satislar.reduce((acc, satis) => acc + satis.fiyat, 0)
    );
    setGunlukToplam(gunlukToplamlar);
  }, [data]);

  return (
    <div className="mainkayit">
      <div className="ayliktablo">
        <h2>Aylık cirolar: </h2>
        <div className="ayliktoplam">
          {aylik.map((ay) => (
            <ul key={ay}>
              <li className="ay">{`${ay}. Ay: ${(aylıktoplam[ay] || 0).toFixed(2)}₺`}</li>
            </ul>
          ))}
        </div>
      </div>

      <div className="gunluk">
        {data.length === 0 ? (
          <p>Veri bulunamadı!</p>
        ) : (
          data.map((item, index) => (
            <div key={item._id} className="gun">
              <h3>Tarih: {new Date(item.gun).toLocaleDateString("tr-TR")}</h3>
              <p>{`Günlük toplam fiyat: ${gunlukToplam[index]?.toFixed(2)}₺`}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Kayitlar;
