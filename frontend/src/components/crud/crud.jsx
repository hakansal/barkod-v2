import React, { useState } from "react";
import axios from "axios";
import "./crud.css"

const Crud = () => {
const [barkod,setbarkod]=useState();
const [isim,setisim]=useState();
const [adet,setadet]=useState();
const [fiyat,setfiyat]=useState()
const data={
    barkod:barkod,
    isim:isim,
    adet:adet,
    fiyat:fiyat
}

const senddata=async(e)=>{
 e.preventDefault();

  try {
    if(!barkod||!isim||!adet||!fiyat){
        alert("verileri ekle")
    }
      const response =await axios({
          method:"post",
          data:data,
          url:"http://localhost:3001/serverapp/kayit",
          headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
      });
      if(response){
          alert("kayıt başarılı");
      }
  } catch (error) {
    alert(error)
     
  }

}

    return <div>

        <div className="maincrud">
            <div className="crudinput">
                <form onSubmit={senddata} className="form">
                    <div className="divdorm">
                        <label className="label">Barkod</label>
                        <input onChange={(e)=>{setbarkod(e.target.value)}} placeholder="barkod" className="input"></input>
                    </div>
                    <div className="divdorm">
                        <label className="label">isim</label>
                        <input onChange={(e)=>{setisim(e.target.value)}} placeholder="isim giriniz" className="input"></input>
                    </div>
                    <div className="divdorm">
                        <label className="label">fiyat</label>
                        <input onChange={(e)=>{setfiyat(e.target.value)}}placeholder="fiyat" className="input"></input>
                    </div>
                    <div className="divdorm">
                        <label className="label">adet</label>
                        <input onChange={(e)=>{setadet(e.target.value)}}placeholder="adet" className="input"></input>
                    </div>

                    <button type ="submint"className="button">kayıt et </button>

                </form>

            </div>
            
        </div>

    </div>
}


export default Crud;