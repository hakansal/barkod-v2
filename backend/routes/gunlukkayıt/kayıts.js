const express=require("express");
const router=express.Router();
const tokencheck = require("../tokencheck");
const Satismodel=require("../../Db/models/gunlukkayit");

router.post("/gunlukkayit",tokencheck,async(req,res)=>{

    const {gun}=req.body;
    if(!gun){
        return res.status(400);
    }try {
        
        const list=await Satismodel.findOne({ gun: { $gte: new Date(gun) } });
        if(!list){
         return res.status(200).json({message:"kayıt yok "});
        }
        else{
            return res.json(list);
        }
    } catch (error) {
        return res.status(400).json({message:"hata"});
    }

})

module.exports =router;
