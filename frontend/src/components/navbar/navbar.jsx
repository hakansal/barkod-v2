import React from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const logout = () => {

        localStorage.setItem("token", null);
        navigate("/")


    }

    return <div>
        <div className="nav">
            <div className="buttonlogo">
                <div className="navbutton" >
                    <Link className="link" to="mainscreen">< p className=" al">Bahçekent AVM</ p></Link>
                </div>
            </div>
            <div className="buttonr">
                 
                    <Link className="link" to="/kayitlar">< p className="a">kayıtlar</ p></Link>
                    
                    <Link className="link" to="/satis">< p className="a">satış</ p></Link>

                    <Link className="link" to="/liste">< p className="a">listele</ p></Link>
 
                    <Link className="link" to="/bul">< p className="a">bul</ p></Link>
  
                    <Link className="link" to="/urunekleme">< p className="a">kayıt</ p></Link>
   
                    <Link className="link" to="/silme">< p className="a">sil</ p></Link>
   
                    <Link className="link" to="/guncelle">< p className="a">güncelle</ p></Link>
              
                    <Link className="link" to="/">< p className="a ck" onClick={logout}>çıkış</ p></Link>



            </div>

        </div>
    </div>
}
export default Navbar;