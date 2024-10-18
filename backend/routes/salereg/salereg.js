const express=require("express");
const Salereg =require("../../Db/models/salereg");
const router=express.Router();
const tokencheck = require("../tokencheck");

router.post("/gunluksatıs",tokencheck,async(req,res)=>{
try {
    
        const {gun}=req.body;
        if(!gun){
            return res.status(400).json({ message: "Gün bilgisi eksik" });
        }
        const items= await Salereg.findOne({gun:gun});
        if(!items){
            return res.status(400).json("hata");
        }
        if(items){
            return res.status(200).json(items);
    
        }
} catch (error) {
    return res.status(400).json({message:"hata",error:error});
    
}
})
module.exports =router;