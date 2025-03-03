import React, { useEffect, useState } from "react";
import    "./main.css"
import axios from "axios";

const Mainscreen= ()=>{
    
   const [gun,setguns]=useState("");
   const [satislar,setsatislar]=useState([]);
   const [toplamfiyat,setToplamfiyat]=useState(0);

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
             url:"https://barkod-v2.onrender.com/serverapp/gunlukkayit",
             headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
         });
         if(respone){
            setguns(respone.data.gun);
            setsatislar(respone.data.satislar);
        }
       } catch (error) {
        
       }
    
       
       }
       getItem();
},[]);

useEffect(() => {
  const toplam = satislar.reduce((acc, item) => acc + item.fiyat, 0);
  setToplamfiyat(toplam);
}, [satislar]);
return (
    <div className="divmain">
       

      <div className="listsatis">
        
      <h2>Günlük Satış Kayıtları</h2>
        {satislar?.length > 0 ? ( 
          satislar.map((item) => (
            
            <div key={item._id} className="satislar">
              <p>{`${item.isim}`}</p>
              <p>{`${item.barkod}`}</p>
              <div className="fiyat">{`${item.fiyat} tl`}</div>
             
            </div>
          ))
        ) : (
          <p>Bugün için satış kaydı bulunmamaktadır.</p>
        )}
      </div>
      <div className="satistoplam">
        <p  >{`toplam fiyat:${toplamfiyat}`}</p>
      </div>
    </div>
  );
}
export default Mainscreen;