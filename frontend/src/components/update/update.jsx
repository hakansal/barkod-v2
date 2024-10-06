import React, { useState } from "react";
import "./update.css"
import axios from "axios";

const Update = () => {

    const [barkod, setbarkod] = useState();
    const [isim, setisim] = useState();
    const [fiyat, setfiyat] = useState();
    const [adet, setadet] = useState();
    const data = {
        barkod: barkod,
        isim: isim,
        fiyat: fiyat,
        adet: adet
    }

    const sendata = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios({
                method: "post",
                data: data,
                url: "http://localhost:3001/serverapp/guncelle",
                headers: { Authorization:  `Bearer ${localStorage.getItem("token")}`  }
            })
              console.log(response);
            if (response) {
                alert("güncellendi")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <div className="mainupdate">
            <div className="inputupdate">
                <form className="form" onSubmit={sendata}>
                    <div className="divinput">
                        <label className="label"> barkod</label>
                        <input onChange={(e) => { setbarkod(e.target.value) }} type="text" placeholder="barkod" className="input"></input>
                    </div>


                    <div className="divinput">
                        <label className="label"> isim</label>
                        <input onChange={(e) => { setisim(e.target.value) }} className="input" type="text" placeholder="isim"></input>
                    </div>

                    <div className="divinput">
                        <label className="label">fiyat</label>
                        <input onChange={(e) => { setfiyat(e.target.value) }} type="text" placeholder="fiyat" className="input"></input>
                    </div>

                    <div className="divinput">
                        <label className="label"> adet</label>
                        <input onChange={(e) => { setadet(e.target.value) }} type="text" placeholder="adet" className="input"></input>
                    </div>
                    <button type="submit" className="button"> güncelle</button>
                </form>
            </div>
        </div>
    </div>
}
export default Update;