import React, { useState } from "react";
import "./sale.css";
import axios from "axios";

const Sale = () => {
    const [barkod, setbarkod] = useState("");
    const [items, setitems] = useState([]);
    const [saleitems, setsaleitems] = useState([]);
    const [price, setprice] = useState(0);
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
            if (response && response.data.item) {
                if (response.data.item.barkod) {
                    setsaleitems((prevItems) => [...prevItems, response.data.item.barkod]);
                }

                if (response.data.item.isim) {
                    setitems((prevItems) => [...prevItems, response.data.item]);
                } else {
                    alert("Ürün bulunamadı.");
                }
                const newprice = price + response.data.item.fiyat;
                setprice(newprice)
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
  const saleiptal=()=>{
    const updatedItems=[];
    setitems(updatedItems);
    setprice(0);
  }
    const deleteitem = (index) => {
        const updatedItems = items.filter((item, i) => i !== index);
        setitems(updatedItems);

        const updatedSaleItems = saleitems.filter((_, i) => i !== index);
        setsaleitems(updatedSaleItems);
        const newprice = price - items[index].fiyat;
        setprice(newprice)
    };


    return (
        <div>
            <div className="mainsale">
                <div className="sale">
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
                </div>

                <div className="listitems">

                    <div className="buut ">
                        <button className="button" onClick={saleitem}>Satış</button>
                        <button className="button" onClick={saleiptal}>iptal</button></div>
                    <ul className="ul">
                        {items.map((item, index) =>
                            item && item.isim ? (
                                <div className="listitem">
                                    <li key={index}>{`Ürün: ${item.isim}, Fiyat: ${item.fiyat}`}</li>
                                    <button key={index} onClick={() => deleteitem(index)} className="buttonitem">çıkar</button>
                                </div>
                            ) : (
                                <li key={index}>Ürün bilgisi bulunamadı</li>
                            )
                        )}
                    </ul>

                </div>
                <div className="sales">
                    <label className="label">{`Toplam :${price} TL`}</label>

                </div>
            </div>
        </div>
    );
};

export default Sale;
