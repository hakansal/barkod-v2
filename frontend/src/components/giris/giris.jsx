import React, { useState } from "react";
import "./giris.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Giris = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showdiv, setShowdiv] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const data = { username, password };

    const summit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://barkod-v2.onrender.com/serverapp/giris", data);

            if (response && response.data.token) {
                localStorage.setItem("token", response.data.token);
                setShowdiv(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/mainscreen");
                }, 1000);
            } else {
                alert("Kullanıcı adı veya şifre yanlış.");
                setLoading(false);
            }
        } catch (error) {
            alert("Giriş başarısız.");
            setLoading(false);
        }
    };

    return (
        <div className="girisbox">
            <h1>Giriş</h1>
            <div className="inputbox">
                <form className="form" onSubmit={summit}>
                    <div className="formdiv">
                        <label className="label">Kullanıcı Adı</label>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            className="input"
                            type="text"
                            required
                        />
                    </div>
                    <div className="formdiv">
                        <label className="label">Şifre</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            type="password"
                            required
                        />
                    </div>
                    <div className="buttondiv">
                        <button type="submit" className="button" disabled={loading}>
                            {loading ? "Yükleniyor..." : "Giriş"}
                        </button>
                    </div>
                    {loading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    )}
                    {showdiv && (
                        <div className="hiddenDiv">
                            Giriş başarılı!
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Giris;
