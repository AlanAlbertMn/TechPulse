'use client';
import { Product } from '@/types/Product';
import { createContext, useContext, useState } from 'react';

export interface SomeContextValue {
   cart: Product[];
   setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<SomeContextValue>({} as SomeContextValue);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Product[]>([]);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)