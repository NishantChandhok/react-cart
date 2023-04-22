import Product from "./Product";
import { useState, useEffect } from "react";
const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://star-spark-pasta.glitch.me/api/products')
            .then(response => response.json())
            .then(products => {
                setProducts(products)
            })
    }, []);
    return (
        <div className="container mx-auto px-32">
            <h1 className="font-bold text-lg my-8">Products</h1>
            <div className="grid grid-cols-5 my-8 gap-24">
                {
                    products.map((productVal, idx) => <Product key={idx} product={productVal} />)
                }
            </div>
        </div>
    );
}

export default Products;