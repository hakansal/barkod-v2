import React, { useEffect, useState } from "react";
import axios from "axios";
import "./kayitlar.css"

const Kayitlar = () => {
  const [data, setData] = useState([]);
  const [aylık,setAylık]=useState(0);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get("http://localhost:3001/serverapp/aylik", {
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
    const toplam = data.reduce((acc, item) => {
      return acc + item.satislar.reduce((sum, satis) => sum + satis.fiyat, 0);
    }, 0);

    setAylık(toplam);
  }, [data]);
  return (
    <div className="ay">
      {data.length === 0 ? (
        <p>Veri bulunamadı!</p>
      ) : (
        data.map((item) => {
          const gunlukToplam = item.satislar.reduce((acc, satis) => acc + satis.fiyat, 0);

          return (
            <div key={item._id} className="gun">
              <h3>Tarih: {new Date(item.gun).toLocaleDateString("tr-TR")}</h3>
              <p>{`Günlük toplam fiyat: ${gunlukToplam}₺`}</p>
               
               
            </div>
          );
        })
      )} <div> <h2>Aylık Toplam Fiyat: {aylık}₺</h2> {/* Aylık toplam gösteriliyor */}</div>
    </div>
    
  );
};

export default Kayitlar;
