import { Minus, MinusCircleIcon, MinusIcon, MinusSquare, Plus, PlusCircle, PlusCircleIcon, PlusSquare, X } from 'lucide-react';
import { useCart } from '@/lib/CartProvider';
import { useEffect } from 'react';

const CartDrawer = ({ handleCartOpen }) => {
    const { cart, setCart } = useCart();

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
					<div key={i} className='my-4 flex flex-col items-center'>
                        <p className='text-center'>{`${item.product.product_title.split(' ').slice(0,10).join(' ')}`}</p>
                        <p className='text-sm text-slate-400'>
                            {item.product.product_price}
                        </p>
                        <div className='flex gap-4'>
							<MinusCircleIcon className='cursor-pointer'/>
                            <p>{item.quantity}</p>
							<PlusCircleIcon className='cursor-pointer'/>
                        </div>
                    </div>
                ))}
				<p className='text-center text-2xl'>
					Total: ${cart.reduce((cartTotal, currProd) => cartTotal + (currProd.product.product_price.replaceAll('$', '')*currProd.quantity), 0)}
				</p>
                <button className='mt-6 w-full bg-blue-500 py-3 rounded-xl'>
                    Checkout
                </button>
				<button
					className='bg-red-800 rounded-xl w-full py-2 mt-6'
					onClick={() => setCart([])}
				>Clear cart</button>
            </div>
        </div>
    );
};

export default CartDrawer;
