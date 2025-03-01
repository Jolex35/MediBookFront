import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./elements/Navbar.tsx";
import DocList from "./pages/DocList.tsx";
import Unknown from "./pages/Unknown.tsx";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/praticiens" element={<DocList />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Unknown />} />
            </Routes>
        </>
    );
}

export default App;