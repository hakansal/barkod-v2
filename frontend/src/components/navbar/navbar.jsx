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
            <div>
                <div>
                    <Link to="mainscreen"><h1>Bahçekent</h1></Link>
                </div>
            </div>
            <div className="buttonr">
                <div>
                    <Link to="/satis"><h3>satış</h3></Link>
                </div>
                <div>
                    <Link to="/liste"><h3>listele</h3></Link>
                </div>
                <div>
                    <Link to="/bul"><h3>bul</h3></Link>
                </div>
                <div>
                    <Link to="/urunekleme"><h3>kayıt</h3></Link>
                </div>
                <div>
                    <Link to="/silme"><h3>sil</h3></Link>
                </div>
                <div>
                    <Link to="/guncelle"><h3>güncelle</h3></Link>
                </div>
                
                <div>

                    <button onClick={logout} className="button">çıkış</button>

                </div>
            </div>

        </div>
    </div>
}
export default Navbar;