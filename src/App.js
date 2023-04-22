import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import Navbar from "./components/Navbar";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
const App = () => {
    const [cart, setCart] = useState({ items: {}, totalItems: 0 });
    useEffect(() => {
        let _cart = JSON.parse(window.localStorage.getItem('cart'));
        if (_cart) setCart(_cart);
    }, []);
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <div>
            <Router>
                <CartContext.Provider value={{ cart, setCart }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/products" element={<Products />}></Route>
                        <Route path="/products/:_id" element={<SingleProduct />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                    </Routes>
                </CartContext.Provider>
            </Router>
        </div>
    );
}

export default App;