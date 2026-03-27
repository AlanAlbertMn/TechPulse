import { X } from 'lucide-react';
import { useCart } from '@/lib/CartProvider';
import { useEffect, useEffectEvent } from 'react';

const CartDrawer = ({ handleCartOpen }) => {
    const { cart, setCart } = useCart();

    console.log(cart);

    // get cart from context for displaying it
    useEffectEvent(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))

    }, [])

    // const [cart, setCart] = useState(cartContext);

    return (
        <div className='fixed inset-0 bg-black/50 z-50'>
            <div className='absolute right-0 top-0 h-full w-80 bg-slate-900 p-6 overflow-y-auto'>
                <div className='flex justify-between mb-6'>
                    <h2>Cart</h2>
                    <button onClick={() => handleCartOpen(false)}>
                        <X />
                    </button>
                </div>

                {cart.length === 0 && <p>No items</p>}

                {cart.map((item, i) => (
                    <div key={i} className='mb-4 flex justify-center'>
                        <p>{`${item.product.product_title.substring(0, 50).trim()}...`}</p>
                        <p className='text-sm text-slate-400'>
                            {item.product.product_price}
                        </p>
                        <div>
                            <p>{item.quantity}</p>
                        </div>
                    </div>
                ))}

                <button className='mt-6 w-full bg-blue-500 py-3 rounded-xl'>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartDrawer;
