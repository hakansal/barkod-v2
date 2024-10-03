const express=require("express");
const Items=require("../../Db/models/items");
const tokencheck=require("../tokencheck");

const router =express.Router();

router.post("/satis",tokencheck,async(req,res)=>{

   try {
     const uruns=[];
     const {items}=req.body;
     uruns=items;
     let i=0;
     if(!items){
      return   res.status(400).json("veri eklemediniz");
     }
      if(items){
        for(i;0<=uruns.length;i++){
            let item=await Items.findOne({barkod:uruns[i]});
            item.adet=item.adet-1;
            item.save();
        };
        return  res.status(200).json(" satış yapıldı");
        
      }
 
   } catch (error) {
      return res.status(400).json({message:"hata",error:error.message});
    
   }
   


})
module.exports=router;