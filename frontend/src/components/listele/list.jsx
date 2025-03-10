import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";
import { useNavigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const cx = process.env.REACT_APP_GOOGLE_CX;

const List = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/giris");
        }
    }, [navigate]);

    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [adet, setAdet] = useState(0);
    const [loading, setLoading] = useState(true);
    const [imgUrls, setImgUrls] = useState({});

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "https://barkod-v2.onrender.com/serverapp/listele",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response?.data?.items) {
                    setItems(response.data.items);
                    setAdet(response.data.adet);
                    setPrice(response.data.price);
                    
                    await fetchImageUrls(response.data.items);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        getItems();
    }, []);

    // Fetch image URLs for each item
    const fetchImageUrls = async (items) => {
        const imgUrlsMap = {};

        // Use Promise.all to wait for all image fetches
        await Promise.all(
            items.map(async (item) => {
                try {
                    const imgResponse = await axios.get(
                        `https://www.googleapis.com/customsearch/v1?q=${item.barkod}&cx=${cx}&key=${apiKey}&searchType=image`
                    );
                    if (imgResponse.data.items && imgResponse.data.items.length > 0) {
                        imgUrlsMap[item._id] = imgResponse.data.items[0].link;
                    } else {
                        imgUrlsMap[item._id] = null; // If no image found, set as null
                    }
                } catch (error) {
                    console.error("Error fetching image for product:", item._id, error);
                    imgUrlsMap[item._id] = null; // If error, set image as null
                }
            })
        );

        setImgUrls(imgUrlsMap);  // Update the imgUrls state with the fetched URLs
        setLoading(false);  
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://barkod-v2.onrender.com/serverapp/sil/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="mainlist">
            <div className="list-header">
                <h1>Ürün Listesi</h1>
                <div className="summary">
                    <div className="summary-item">
                        <h2>Toplam Ürün: {adet}</h2>
                    </div>
                    <div className="summary-item">
                        <h2>Toplam Fiyat: {price} TL</h2>
                    </div>
                </div>
            </div>

            <div className="displaylist">
                <ul className="list">
                    {items.map((item) => (
                        <div className="listitem" key={item._id}>
                            <div className="item-info">
                                <p className="item-barkod">{item.barkod}</p>
                                <div>
                                    {loading && <div className="spinner"></div>}
                                    <img
                                        className="img"
                                        src={imgUrls[item._id] || "/default-image.png"}  
                                        alt=""
                                    />
                                </div>
                                <p className="item-name">{item.isim}</p>
                                <p className="item-adet">{item.adet} Adet</p>
                                <p className="item-price">{item.fiyat} TL</p>
                                <button onClick={() => handleDelete(item._id)}>Sil</button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default List;
