import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";
import { useNavigate } from "react-router-dom";

const List = () => {
    const navigate = useNavigate();

    // Token kontrolünü doğru şekilde yapıyoruz.
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/giris");
        }
    }, [navigate]);

    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [adet, setAdet] = useState(0);

    // getitems fonksiyonunu useEffect içinde çağırıyoruz.
    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "https://barkod-v2.onrender.com/serverapp/listele",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response?.data?.items) {
                    setItems(response.data.items);
                    setAdet(response.data.adet);
                    setPrice(response.data.price);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        getItems();
    }, []);

    return (
        <div className="mainlist">
            <div className="list-header">
                <h1>Ürün Listesi</h1>
                <div className="summary">
                    <div className="summary-item">
                        <h2>Toplam Ürün: {adet}</h2>
                    </div>
                    <div className="summary-item">
                        <h2>Toplam Fiyat: {price} TL</h2>
                    </div>
                </div>
            </div>

            <div className="displaylist">
                <ul className="list">
                    {items.map((item) => (
                        <div className="listitem" key={item._id}>
                            <div className="item-info">
                                <p className="item-barkod">{item.barkod}</p>
                                <p className="item-name">{item.isim}</p>
                                <p className="item-adet">{item.adet} Adet</p>
                                <p className="item-price">{item.fiyat} TL</p>
                            </div>
                            
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default List;
