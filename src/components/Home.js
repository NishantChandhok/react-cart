import { Link } from 'react-router-dom';
import Products from './Products';
const Home = () => {
    return (
        <>
            <div className="hero py-16 px-32">
                <div className="container mx-auto pb-20 flex items-center justify-between">
                    <div className="w-1/2">
                        <h6 className="text-lg"><em>Are you hungry?</em></h6>
                        <h1 className="text-3xl md:text-6xl font-bold">Don't Wait !</h1>
                        <Link to='/products'><button className="bg-yellow-500 mt-4 py-2 px-6 rounded-full text-white font-bold hover:bg-yellow-600">Order Now</button></Link>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <img src="/images/pizza.png" alt="pizza" className='w-2/3' />
                    </div>
                </div>
            </div>
            <Products />
        </>
    );
}

export default Home;