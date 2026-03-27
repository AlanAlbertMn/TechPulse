'use client'
import { useCart } from '@/lib/CartProvider';
import { CartProps, Product } from '@/types/Product';
import { useEffect } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
    const { cart, setCart } = useCart();

    useEffect(() => {

        //TODO: fix re rendering on every component when cart changes
        //console.log(cart);

        localStorage.setItem('cart', JSON.stringify(cart));

    }, [cart])


    const handleAddCart = () => {
        // Save into localstorage, then check for dupes
        // const cartSearchArray: CartProps[] = JSON.parse(localStorage.getItem('cart') || "''");
        // cartSearchArray.map(prod => prod.asin==product.asin ? )
        // maybe total and quantities here?
        console.log("Producto clickeado: " + product.product_title);
        const productToAdd: CartProps = { product: product, quantity: 1 };
        setCart([productToAdd, ...cart]);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <button
            onClick={() => handleAddCart()}
            className='w-full bg-cyan-600 py-2 rounded-xl hover:bg-cyan-800'
        >
            Add to cart
        </button>
    );
};
