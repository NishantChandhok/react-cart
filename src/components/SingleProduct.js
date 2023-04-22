import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const SingleProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://star-spark-pasta.glitch.me/api/products/${params._id}`)
            .then(res => res.json())
            .then(product => {
                setProduct(product);
            })
    }, [params._id])
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
        <div className="container px-32 mx-auto">
            <Link className="font-bold hover:text-yellow-700 mb-12" onClick={() => { navigate(-1) }}>Back</Link>
            <div className="flex">
                <img src={product.image} alt="product" className="w-5/12" />
                <div className="ml-16">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="text-lg"><em>{product.size}</em></div>
                    <div className="font-bold mt-4 text-3xl">₹ {product.price}</div>
                    <button onClick={(e) => { addToCart(e, product) }} className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500  hover:bg-yellow-600'} py-2 px-8 rounded-full text-white font-bold text-lg`} >ADD{!isAdding ? '' : 'ED'} TO CART</button>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;