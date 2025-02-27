import React, { useState } from "react";
import axios from "axios";
import "./list.css"
import { useNavigate } from "react-router-dom";
const List = () => {
    const navigate = useNavigate()
    if (localStorage.getItem("token" == null)) {
        navigate("/giris")

    }

    const [items, setItems] = useState([]);
    const [price, setprice] = useState();
    const [adet, setadet] = useState();
    const getitems = async () => {


        const response = await axios({
            method: "get",
            url: "https://barkod-v2.onrender.com/serverapp/listele",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

        });

        if (response) {
            setItems(response.data.items);
            setadet(response.data.adet);
            setprice(response.data.price);
        }
    }
    getitems();

    return <div className="mainlist">
         
        <div className="displaylist">
            <ul className="list">
                {items.map((item) => (
                    <div className="listitem">
                        <li key={item._id}>{(` ${item.barkod}   ${item.isim} ${item.adet} adet  fiyatı:${item.fiyat}`)}</li>


                    </div>
                ))}
            </ul>
        </div>
        <div className="listinfo">
            <h1>toplam ürün:{adet}</h1>
            <h1>toplam fiyat:{price}</h1>

        </div>

    </div>
}

export default List;