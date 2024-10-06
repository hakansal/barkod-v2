import React, { useState } from "react";
import "./sale.css";
import axios from "axios";

const Sale = () => {
    const [barkod, setbarkod] = useState("");
    const [items, setitems] = useState([]);
    const [saleitems, setsaleitems] = useState([]);
    const saledata = {
        items: saleitems
    }

    const data = {
        barkod: barkod,
    };

    const getitem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: "post",
                data: data,
                url: "http://localhost:3001/serverapp/bul",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (response && response.data) {
                if (response.data.barkod) {
                    setsaleitems((prevItems) => [...prevItems, response.data.barkod]);
                }

                if (response.data.isim) {
                    setitems((prevItems) => [...prevItems, response.data]);
                } else {
                    alert("Ürün bulunamadı.");
                }
            }
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };

    const saleitem = async () => {
        if (items.length === 0) {
            return alert("Lütfen ürün ekleyiniz");
        }
        try {
            const response = await axios({
                method: "post",
                data: saledata,
                url: "http://localhost:3001/serverapp/satis",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response) {
                alert("Satış yapıldı");
            }
        } catch (error) {
            console.error("Error making sale:", error);
        }
    };
    

    return (
        <div>
            <div className="mainsale">
                <div className="saleinput">
                    <form onSubmit={getitem}>
                        <input
                            className="input"
                            type="text"
                            value={barkod}
                            onChange={(e) => setbarkod(e.target.value)}
                            placeholder="Barkod giriniz"
                        />
                        <button className="button" type="submit">
                            Gönder
                        </button>
                    </form>
                </div>

                <div className="listitems">
                    <ul className="ul">
                        {items.map((item, index) =>
                            item && item.isim ? (
                                <div className="listitem">
                                    <li key={index}>{`Ürün: ${item.isim}, Fiyat: ${item.fiyat}`}</li>
                                    <button key={index}  className="buttonitem">çıkar</button>
                                </div>
                            ) : (
                                <li key={index}>Ürün bilgisi bulunamadı</li>
                            )
                        )}
                    </ul>
                    <button className="button" onClick={saleitem}>
                        Satış
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sale;
