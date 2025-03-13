import './App.css';
import Giris from './components/giris/giris';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Mainscreen from "./components/main/main";
import Navbar from './components/navbar/navbar';
import List from "./components/listele/list";
import Bul from './components/bul/bul';
import Sale from './components/sale/sale';
import Crud from './components/crud/crud';
import Sil from './components/sil/sil';
import Update from './components/update/update';
import Kayitlar from "./components/kayıtlar/kayitlar"
function App() {
  const location = useLocation();   

  return (
    <div className="App"> 
      {location.pathname !== "/" && <Navbar />}
       
      <Routes>
        <Route path="/" element={<Giris />} />
        <Route path="/mainscreen" element={<Mainscreen />} />
        <Route path="/liste" element={<List />} />
        <Route path="/bul" element={<Bul/>}/>
        <Route path="/satis" element={<Sale/>}/>
        <Route path="/urunekleme" element={<Crud/>}/>
        <Route path="/silme" element={<Sil/>}/>
        <Route path="/guncelle" element={<Update/>}/>
        <Route path='/kayitlar' element={<Kayitlar/>}/>


      </Routes>
    </div>)

