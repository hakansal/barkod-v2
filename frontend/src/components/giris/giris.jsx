import React, { useState } from "react";
import "./giris.css"
import axios from "axios";

const Giris = () => {
  const [userName,setUserName]=useState("");
  const [password,SetPassword]=useState("");
 const data={
    userName:userName,
    password:password
 }
  const summit= async(e)=>{
 try {
       e.prevent.default();  
      const sends=await axios({method:"post",url:"url",data:data})
      
      if(sends){
       const token=await sends.json();
       localStorage.setItem("token",token.token);
      }
 } catch (error) {
    
 }
  }



    return <div>

        <div className="girisbox">
            <h1>Giriş</h1>
            <div className="inputbox">
                <form className="form">
                    <div className="formdiv">
                        <label className="label">kullanıcı adı</label>
                        <input onChange={(e)=>{ setUserName(e.target.value);}} className="input" type="text"></input>
                    </div>
                    <div className="formdiv">
                        <label className="label">şifre</label>

                        <input onChange={(e)=>{SetPassword(e.target.value);}} className="input" type="text"></input>
                    </div>
                    <div className="buttondiv">
                        <button className="button">Giriş</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
}

export default Giris;