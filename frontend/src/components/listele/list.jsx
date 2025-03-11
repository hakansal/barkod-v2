import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";
import { useNavigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const cx = process.env.REACT_APP_GOOGLE_CX;

const List = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [price, setPrice] = useState(0);
    const [adet, setAdet] = useState(0);
    const [loading, setLoading] = useState(true);
    const [imgUrls, setImgUrls] = useState({});
    const [barkods, setBarkods] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/giris");
        }
    }, [navigate]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios.get(
                    "https://barkod-v2.onrender.com/serverapp/listele",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );

                if (response?.data?.items) {
                    setItems(response.data.items);
                    setFilteredItems(response.data.items); // ilk yükleme
                    setAdet(response.data.adet);
                    setPrice(response.data.price);

                    const barkodSet = new Set(response.data.items.map((item) => item.barkod));
                    setBarkods(barkodSet.size);

                    await fetchImageUrls(response.data.items);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        getItems();
    }, []);

    const fetchImageUrls = async (items) => {
        const imgUrlsMap = {};

        await Promise.all(
            items.map(async (item) => {
                try {
                    const imgResponse = await axios.get(
                        `https://www.googleapis.com/customsearch/v1?q=${item.barkod}&cx=${cx}&key=${apiKey}&searchType=image`
                    );
                    imgUrlsMap[item._id] = imgResponse?.data?.items?.[0]?.link || null;
                } catch (error) {
                    console.error("Error fetching image for product:", item._id, error);
                    imgUrlsMap[item._id] = null;
                }
            })
        );

        setImgUrls(imgUrlsMap);
        setLoading(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = items.filter((item) =>
            item.isim.toLowerCase().includes(query) || item.barkod.includes(query)
        );
        setFilteredItems(filtered);
    };

    return (
        <div className="mainlist">
            <div className="list-header">
                <h1>Ürün Listesi</h1>
                <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <div className="summary">
                    <div className="summary-item">
                        <h2>Toplam Ürün: {adet}</h2>
                    </div>
                    <div className="summary-item">
                        <h2>Toplam Fiyat: {price} TL</h2>
                    </div>
                    <div className="summary-item">
                        <h2>Ürün Çeşidi: {barkods}</h2>
                    </div>
                </div>
            </div>

            <div className="displaylist">
                <ul className="list">
                    {filteredItems.map((item) => (
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
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default List;
