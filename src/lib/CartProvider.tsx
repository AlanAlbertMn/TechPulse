'use client';
import { CartProps } from '@/types/Product';
import { createContext, useContext, useState } from 'react';

export interface SomeContextValue {
   cart: CartProps[],
   setCart: React.Dispatch<React.SetStateAction<CartProps[]>>;
}

const CartContext = createContext<SomeContextValue>({} as SomeContextValue);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<CartProps[]>([]);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)