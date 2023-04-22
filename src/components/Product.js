import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useContext, useState } from "react";
const Product = (prop) => {
    const { product } = prop;
    const { cart, setCart } = useContext(CartContext);
    const [isAdding, setIsAdding] = useState(false);
    const addToCart = (event, product) => {
        let _cart = { ...cart };
        if (_cart.items[product._id]) _cart.items[product._id] += 1;
        else _cart.items[product._id] = 1;
        _cart.totalItems += 1;
        setCart(_cart);
        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 700);
    }
    return (
        <div className="text-center">
            <Link to={`/products/${product._id}`}>
                <img src={product.image} alt="pep" />
                <h2 className="text-base font-bold py-1">{product.name}</h2>
            </Link>
            <span className="text-sm">{product.size}</span>
            <div className="flex justify-between items-center mt-2">
                <span className="font-bold">₹ {product.price}</span>
                <button disabled={isAdding} onClick={(e) => { addToCart(e, product) }} className={`${!isAdding ? 'bg-yellow-500  hover:bg-yellow-600' : 'bg-green-500'} py-1 px-4 rounded-full text-white font-bold`} >ADD{!isAdding ? '' : 'ED'}</button>
            </div>

        </div>
    );
}

export default Product;