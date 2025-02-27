import React, { useState } from "react";
import "./giris.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";  
const Giris = () => {
    const [username, setUserName] = useState("");
    const [password, SetPassword] = useState("");
    const navigate=useNavigate();
    const data = {
        username: username,
        password: password
    }
   
    const summit = async (e) => {
        
        try {
            e.preventDefault();
            const response = await axios({ method: "post", url: "https://barkod-v2.onrender.com/serverapp/giris", data: data })

            if (response) {
                const token =response.data.token;
                localStorage.setItem("token",  token );
               alert("başarılı");
               navigate("/mainscreen"); 

            }
            else{
                alert(" wdwd");
            }
        } catch (error) {
            alert("başarısız");
            console.log(error);
        }
    }
 

    return <div>

        <div className="girisbox">
            <h1>Giriş</h1>
            <div className="inputbox">
                <form className="form" onSubmit={summit} >
                    <div className="formdiv">
                        <label className="label">kullanıcı adı</label>
                        <input onChange={(e) => { setUserName(e.target.value); }} className="input" type="text"></input>
                    </div>
                    <div className="formdiv">
                        <label className="label">şifre</label>

                        <input onChange={(e) => { SetPassword(e.target.value); }} className="input" type="text"></input>
                    </div>
                    <div className="buttondiv">
                        <button   className="button">Giriş</button>
                    </div>
                </form>
            </div>

        </div>
        <div>
        
        </div>

    </div>
}

export default Giris;