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
                    <Link className="link" to="mainscreen">< a className=" al">Bahçekent AVM</ a></Link>
                </div>
            </div>
            <div className="buttonr">
                <div>
                    <Link className="link" to="/kayitlar">< a className="a">kayıtlar</ a></Link>
                </div>
                <div>
                    <Link className="link" to="/satis">< a className="a">satış</ a></Link>
                </div>
                <div>
                    <Link className="link" to="/liste">< a className="a">listele</ a></Link>
                </div>
                <div>
                    <Link className="link" to="/bul">< a className="a">bul</ a></Link>
                </div>
                <div>
                    <Link className="link" to="/urunekleme">< a className="a">kayıt</ a></Link>
                </div>
                <div>
                    <Link className="link" to="/silme">< a className="a">sil</ a></Link>
                </div>
                <div>
                    <Link className="link" to="/guncelle">< a className="a">güncelle</ a></Link>
                </div>

                <div>

                    <Link className="link" to="/">< a className="a ck" onClick={logout}>çıkış</ a></Link>

                </div>

            </div>

        </div>
    </div>
}
export default Navbar;