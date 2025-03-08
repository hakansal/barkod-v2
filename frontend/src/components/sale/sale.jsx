import React, { useState } from "react";
import "./sale.css";
import axios from "axios";

const Sale = () => {
    const [barkod, setBarkod] = useState("");
    const [items, setItems] = useState([]);
    const [saleItems, setSaleItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [donesale, setDonesale] = useState(null); // null, success, error

    const getItem = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "https://barkod-v2.onrender.com/serverapp/bul",
                { barkod },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            if (response?.data?.item) {
                const item = response.data.item;
                setSaleItems((prevItems) => [...prevItems, item.barkod]);
                setItems((prevItems) => [...prevItems, item]);
                setPrice((prevPrice) => prevPrice + item.fiyat);
            } else {
                alert("Ürün bulunamadı.");
            }
            setBarkod("");
        } catch (error) {
            console.error("Ürün getirirken hata oluştu:", error);
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
    };

    const deleteItem = (index) => {
        setPrice((prevPrice) => prevPrice - items[index].fiyat);
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
        setSaleItems((prevSaleItems) => prevSaleItems.filter((_, i) => i !== index));
    };

    // Hide the sale message after 3 seconds
    React.useEffect(() => {
        if (donesale) {
            const timer = setTimeout(() => {
                setDonesale(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [donesale]);

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
                    {loading && (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="listitems">
                <ul className="ul">
                    {items.map((item, index) => (
                        <div className="listitem" key={index}>
                            <li>{`Ürün: ${item.isim}`}</li>
                            <span>{` Fiyat: ${item.fiyat} TL`}</span>
                            <button onClick={() => deleteItem(index)} className="buttonitem">Çıkar</button>
                        </div>
                    ))}
                </ul>

                {donesale && (
                    <div className={`sale-message ${donesale}`}>
                        {donesale === "success" ? "Satış yapıldı!" : "Satış yapılamadı!"}
                    </div>
                )}
            </div>

            <div className="sales">
                <div className="buut">
                    <button className="button" onClick={saleItem} disabled={loading}>
                        Satış
                    </button>
                    <button className="button" onClick={saleIptal} disabled={loading}>
                        İptal
                    </button>
                </div>
                <label className="label">{`Toplam: ${price} TL`}</label>
            </div>
        </div>
    );
};

export default Sale;
