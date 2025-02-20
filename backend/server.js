const express=require("express");
const app=express();
const Connect=require("./Db/config/config");
const cors=require("cors");
app.use(express.json());
app.use(cors());
express.json()
Connect();
require("dotenv").config();
const routeDelete=require("./routes/delete/delete");
const routeFind=require("./routes/find/find");
const routeGiris=require("./routes/giris/giris");
const routeKayit=require("./routes/kayit/kayit");
const routeList=require("./routes/list/list");
const routeSale=require("./routes/sale/sale");
const routeUpdate=require("./routes/update/update");
const routerkayıts=require("./routes/gunlukkayıt/kayıts");
const routeraylikkayit=require("./routes/aylıkkayıt/aylık");
 
app.get("/serverapp",(req,res)=>{
    res.status(200).json("ad")
});

app.use("/serverapp",routeDelete);
app.use("/serverapp",routeFind);
app.use("/serverapp",routeGiris);
app.use("/serverapp",routeKayit);
app.use("/serverapp",routeList);
app.use("/serverapp",routeSale);
app.use("/serverapp",routeUpdate);
app.use("/serverapp",routerkayıts);
app.use("/serverapp",routeraylikkayit)


app.listen(process.env.SERVER_PORT,()=>{
    console.log("sever is ready");
})