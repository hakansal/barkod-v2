const express=require("express");
express.Router();
const Items =require("../../Db/models/items");
const router = require("../kayit/kayit");
const tokencheck=require("../tokencheck");

router.delete("/sil",tokencheck,async(req,res)=>{
  try {
      const {barkod}=req.body;
      if(!barkod){
        return   res.status(400).json("barkod giriniz");
      };
      const item= await Items.findOne({barkod:barkod});
      if(!item){
        return  res.status(400).json("böyle bir ürün yok");
      };
      if(item){
          await Items.deleteOne({barkod:barkod});
          return res.status(400).json(" silindi");

      }
  
  } catch (err) {

   return res.status(400).json({message:"hata",error:err});
    
    
  }
});
module.exports=router;