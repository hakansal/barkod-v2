const jwt=require("jsonwebtoken");

const tokencheck=(req,res,next)=>{
    try {
        const token=req.header("Authorization");
        if(!token){
           return res.status(400).json("hata gerekli tokeniniz yok");
        };
        const decoded=jwt.verify(token.replace("Bearer ", "") ,process.env.SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
       return res.status(400).json({message:"hata",error:error.message});
       
    }
   };

   module.exports=tokencheck;