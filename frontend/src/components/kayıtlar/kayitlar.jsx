import React, { useEffect, useState } from "react";
import axios from "axios";
import "./kayitlar.css";

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const Kayitlar = () => {
  const [data, setData] = useState([]);
  

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

  // Verileri yıl-ay bazında gruplandırıyoruz
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.gun);
    const month = date.getMonth(); // 0-indexed
    const year = date.getFullYear();
    const key = `${year}-${month}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // Her ay için takvim görünümünü oluşturacak fonksiyon
  const renderCalendar = (items, key) => {
    const [year, month] = key.split("-").map(Number);
    let firstDay = new Date(year, month, 1).getDay();
    // Haftanın ilk günü olarak Pazartesi'yi kabul etmek için:
    firstDay = (firstDay + 6) % 7;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Gün bazında satışları hesaplıyoruz
    const dailySales = {};
    items.forEach(item => {
      const date = new Date(item.gun);
      const day = date.getDate();
      const toplam = item.satislar.reduce((acc, s) => acc + s.fiyat, 0);
      dailySales[day] = (dailySales[day] || 0) + toplam;
    });

    // Ayın toplam satışını hesaplıyoruz
    const monthTotal = Object.values(dailySales).reduce((acc, cur) => acc + cur, 0);

    // Bugünün tarihini alıyoruz
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    // Takvim hücrelerini oluşturuyoruz: Önce boş hücreler, ardından gerçek günler
    const cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(d);
    }

    return (
      <div className="month-calendar" key={key}>
        <h3>
          {monthNames[month]} {year} - Toplam: {monthTotal.toFixed(2)}₺
        </h3>
        <div className="calendar-grid">
          {/* Haftanın gün isimleri */}
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day, index) => (
            <div className="calendar-header" key={index}>{day}</div>
          ))}
          {cells.map((cell, idx) => {
            // Eğer hücre boş ise, boş render ediyoruz.
            if (!cell) return <div key={idx} className="calendar-cell empty-cell"></div>;

            // Bugünün tarihine eşit olup olmadığını kontrol ediyoruz.
            const isToday = isCurrentMonth && cell === todayDate;

            return (
              <div key={idx} className={`calendar-cell ${isToday ? "today" : ""}`}>
                <span className="cell-day">{cell}</span>
                <span className="cell-sales">{(dailySales[cell] || 0).toFixed(2)}₺</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {Object.keys(groupedData).length === 0 ? (
        <p>Veri bulunamadı!</p>
      ) : (
        Object.keys(groupedData)
          .sort((a, b) => {
            const [yearA, monthA] = a.split("-").map(Number);
            const [yearB, monthB] = b.split("-").map(Number);
            return yearA !== yearB ? yearA - yearB : monthA - monthB;
          })
          .map(key => renderCalendar(groupedData[key], key))
      )}
    </div>
  );
};

export default Kayitlar;
