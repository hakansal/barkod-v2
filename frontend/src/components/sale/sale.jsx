import React, { useState } from "react";
import "./sale.css";
import axios from "axios";

const Sale = () => {
    const [barkod, setBarkod] = useState("");
    const [items, setItems] = useState([]);
    const [saleItems, setSaleItems] = useState([]);
    const [price, setPrice] = useState(0);

    const getItem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://barkod-v2.onrender.com/serverapp/bul",
                { barkod },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            if (response && response.data.item) {
                const item = response.data.item;
                
                if (item.barkod) {
                    setSaleItems((prevItems) => [...prevItems, item.barkod]);
                }

                if (item.isim) {
                    setItems((prevItems) => [...prevItems, item]);
                    setPrice((prevPrice) => prevPrice + item.fiyat);
                } else {
                    alert("Ürün bulunamadı.");
                }
            }
        } catch (error) {
            console.error("Ürün getirirken hata oluştu:", error);
        }
    };

    const saleItem = async () => {
        if (items.length === 0) {
            return alert("Lütfen ürün ekleyiniz");
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/serverapp/satis",
                { items: saleItems },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            if (response) {
                alert("Satış yapıldı");
                saleIptal(); // Satıştan sonra listeyi temizle
            }
        } catch (error) {
            alert("Satış işlemi sırasında hata oluştu.");
            console.error(error);
        }
    };

    const saleIptal = () => {
        setSaleItems([]);
        setItems([]);
        setPrice(0);
    };

    const deleteItem = (index) => {
        setPrice((prevPrice) => prevPrice - items[index].fiyat);
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
        setSaleItems((prevSaleItems) => prevSaleItems.filter((_, i) => i !== index));
    };

    return (
        <div className="mainsale">
            <div className="sale">
                <div className="saleinput">
                    <form onSubmit={getItem}>
                        <input
                            className="input"
                            type="text"
                            value={barkod}
                            onChange={(e) => setBarkod(e.target.value)}
                            placeholder="Barkod giriniz"
                        />
                        <button className="button" type="submit">Gönder</button>
                    </form>
                </div>
            </div>

            <div className="listitems">
                <div className="buut">
                    <button className="button" onClick={saleItem}>Satış</button>
                    <button className="button" onClick={saleIptal}>İptal</button>
                </div>

                <ul className="ul">
                    {items.map((item, index) => (
                        <div className="listitem" key={index}>
                            <li>{`Ürün: ${item.isim}, Fiyat: ${item.fiyat} TL`}</li>
                            <button onClick={() => deleteItem(index)} className="buttonitem">Çıkar</button>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="sales">
                <label className="label">{`Toplam: ${price} TL`}</label>
            </div>
        </div>
    );
};

export default Sale;
