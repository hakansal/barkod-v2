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

        try {
            if (barkod == null) {
                return alert("barkod ekleyiniz");
            }
            const response = await axios({
                method: "post",
                data: data,
                url: "http://localhost:3001/serverapp/bul",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (!response) {
                return alert("hata");

            }
            if (response) {

                return setserverresponse(response.data.item);
            }
            else {

                return alert("hata")
            }
        } catch (error) {
          return  alert(error);
        }
    };
    return <div>
        <div className="bulmain">
            <div className="bulinput">
                <form className="form" onSubmit={getresponse} >

                    <div>
                        <label className="label">barkod </label>
                        <input onChange={(e) => setbarkod(e.target.value)} className="input" type="text"></input>
                    </div>
                    <button className="button"> bul</button>
                </form>


            </div>
            <div className="bulresponse">
                <div className="">

                    {`${serverresponse.isim}  adet ${serverresponse.adet}  fiyatı ${serverresponse.fiyat}`}


                </div>
            </div>

        </div>

    </div>
}

export default Bul;