const express=require("express");
const Satismodel=require("../../Db/models/gunlukkayit");
const router=express.Router();


router.get("/aylik",async(req,res)=>{

 try {
    
       const kayit=await Satismodel.find();
       
       if(!kayit)return res.status(400).json({message:"hata"})
       else{
          return res.json(kayit);
       }    
 } catch (error) {
    return res.status(400).json(error);
 }

});

module.exports=router;