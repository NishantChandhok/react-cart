import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [priceFetched, togglePriceFetched] = useState(false);
    useEffect(() => {
        if (cart.totalItems === 0 || priceFetched) return;
        fetch('https://star-spark-pasta.glitch.me/api/products/cart-items',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: Object.keys(cart.items) })
            })
            .then(res => res.json())
            .then(products => {
                setProducts(products);
                togglePriceFetched(true);
            });
    }, [cart, priceFetched]);

    const increment = (id) => {
        let _cart = { ...cart };
        _cart.items[id] += 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }
    const decrement = (id) => {
        if (cart.items[id] === 1) return;
        let _cart = { ...cart };
        _cart.items[id] -= 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }
    const deleteItem = (id) => {
        let _cart = { ...cart };
        _cart.totalItems -= _cart.items[id];
        delete _cart.items[id];
        setCart(_cart);
        setProducts(products.filter((product) => product._id !== id));
    }
    const handleOrder = () => {
        window.alert("Order Placed Successfully");
        setProducts([]);
        setCart({ items: {}, totalItems: 0 });
    }
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let amount = 0;
        for (let product of products) {
            amount += product.price * cart.items[product._id];
        }
        setTotalAmount(amount);
    }, [cart, products]);
    return (
        products.length ?
            <div className="container mx-auto pb-24 lg:w-1/2 w-full">
                <h1 className="my-12 font-bold">Cart Items</h1>
                <ul>
                    {

                        products.map(product => {
                            return (
                                <li className="mb-4" key={product._id}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img className="h-16" src={product.image} alt="piizza" />
                                            <span className="ml-8 font-bold">{product.name}</span>
                                        </div>
                                        <div>
                                            <button onClick={() => { decrement(product._id) }} className="bg-yellow-500 hover:bg-yellow-600 mx-2 px-4 py-2 rounded-full leading-none font-bold">-</button>
                                            <b>{cart.items[product._id]}</b>
                                            <button onClick={() => { increment(product._id) }} className="bg-yellow-500 hover:bg-yellow-600 mx-2 px-4 py-2 rounded-full leading-none font-bold">+</button>
                                        </div>
                                        <span className="font-bold">₹ {product.price * cart.items[product._id]}</span>
                                        <button onClick={() => { deleteItem(product._id) }} className="bg-red-500 hover:bg-red-600 mx-2 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>


                <hr className="my-6" />
                <div className="text-right font-bold">
                    Grand Total : ₹ {totalAmount}
                </div>
                <div className="text-right mt-6">
                    <button onClick={handleOrder} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full leading-none font-bold">Order Now</button>
                </div>
            </div>
            :
            <img className="mx-auto w-1/2 mt-8" src="/images/empty-cart.png" alt="" />
    );
}

export default Cart;