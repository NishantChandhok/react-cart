import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const cartStyle = {
        display: 'flex',
        padding: '6px 12px',
        borderRadius: '50px'

    };
    return (
        <>
            <nav className='container mx-auto px-20 py-4 flex items-center justify-between'>

                <Link to='/'><img src='/images/logo.png' alt='logo' style={{ height: 45 }} /></Link>

                <ul className='flex items-center'>
                    <li><Link to='/' className='hover:font-bold'>Home</Link></li>
                    <li className='ml-6'><Link to='/products' className='hover:font-bold'>Products</Link></li>
                    <li className='ml-6'>
                        <Link to='/cart'>
                            <div style={cartStyle} className='bg-yellow-500 hover:bg-yellow-600'>
                                <span>{cart.totalItems}</span>
                                <img src='/images/cart.png' alt='cart-logo' className='ml-2' />
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav >
        </>
    );
}

export default Navbar;