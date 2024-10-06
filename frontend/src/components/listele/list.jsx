import React, { useState } from "react";
import axios from "axios";

const List=  ()=>{
 
   const [items,setItems]=useState([]);
    const getitems=async()=>{

         
    const response = await axios({
        method:"get",
        url:"http://localhost:3001/serverapp/listele",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    
    });

    if(response){
         setItems(response.data);
    }
    }
     getitems();

    return <div>
            <ul>
               {items.map((item)=>(
                <li key={item._id}>{(` ${item.isim}________ ${item.adet} adet  fiyatı:${item.fiyat}`)}</li>
               ))} 
            </ul>
         
    </div>
}

export default List;