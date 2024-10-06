import React, { useState } from "react";
import axios from "axios";
import "./bul.css";

const Bul = () => {
    const [serverresponse, setserverresponse] = useState([]);
    const [barkod, setbarkod] = useState();
    const data = {
        barkod: barkod
    }
    const getresponse = async (e) => {
        e.preventDefault();
        const response = await axios({
            method: "post",
            data: data,
            url: "http://localhost:3001/serverapp/bul",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        if (!response) {
            alert("hata");

        }
        else{

            console.log(response);
            setserverresponse(response.data);
        }
    };
    return <div>
        <div className="bulmain">
            <div className="bulinput">
                <form onSubmit={getresponse} >

                    <label className="label">barkod</label>
                    <input onChange={(e) => setbarkod(e.target.value)} className="input" type="text"></input>
                    <button className="button"> bul</button>
                </form>
                 

            </div>
            <div className="bulresponse">
               {`${serverresponse.isim}  adet ${serverresponse.adet}  fiyatı ${serverresponse.fiyat}`}
            </div>

        </div>

    </div>
}

export default Bul;