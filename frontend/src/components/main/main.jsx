import React, { useEffect, useState } from "react";
import    "./main.css"
import axios from "axios";

const Mainscreen= ()=>{
    
   const [gun,setguns]=useState("");
   const [satislar,setsatislar]=useState([]);

useEffect(()=>{
    const getItem= async()=>{
       try {
        const today = new Date();
        const todayStr = today.toDateString();
         const data={
             gun:todayStr
         }
         const respone=await axios({
             method:"post",
             data:data,
             url:"http://localhost:3001/serverapp/gunlukkayit",
             headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
         });
         if(respone){
            setguns(respone.data.gun);
            setsatislar(respone.data.satislar);
        }
       } catch (error) {
        alert("data yüklenemedi")
       }
    
       
       }
       getItem();
},[]);


return (
    <div>
       

      <div className="listsatis">
        
      <h2>Günlük Satış Kayıtları</h2>
        {satislar?.length > 0 ? ( // Güvenli kontrol
          satislar.map((item) => (
            <div key={item._id} className="satislar">
              {`${item.barkod} - ${item.isim} - ${item.fiyat} TL`}
            </div>
          ))
        ) : (
          <p>Bugün için satış kaydı bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}
export default Mainscreen;