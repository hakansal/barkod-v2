import React, { useState } from "react";
import "./sil.css";
import axios from "axios";

const Sil = () => {

    const [barkod, setbarkod] = useState();
    const [responsil, setresponse] = useState([]);
    const data = {
        barkod: barkod
    }
    const sendata = async (e) => {
        e.preventDefault();
        try {

            const response = await axios({
                method: "post",
                data: data,
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                url: "http://localhost:3001/serverapp/bul"
            });
            if (response) {
                setresponse(response.data.item);
                alert("eminmisin")
            }
        } catch (error) {
            alert(error)
        }


    }
    const deleteresponse = async () => {
        try {

            const response = await axios({
                method: "delete",
                data: data,
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                url: "http://localhost:3001/serverapp/sil"
            })
            if (response) {
                alert("silindi")
            }
        } catch (error) {
            alert(error)
        }

    }

    return <div>

        <div className="mainsil">
            <div className="sorgu">
                <form className="form" onSubmit={sendata} >
                    <div className="formsil" >
                        <label className="label">barkod</label>
                        <input onChange={(e) => { setbarkod(e.target.value) }} type="text" placeholder="barkod" className="input"></input>

                    </div>
                    <button type="submit" className="button">bul</button>
                </form>

            </div>
            <div className="responsesil">
                <div className="listitem">
                <p>{`ürün:${responsil.isim} fiyatı:${responsil.fiyat}`}</p>
                    
                </div>
                <button className="button" onClick={deleteresponse}> sil</button>
            </div>

        </div>

    </div>
}

export default Sil;