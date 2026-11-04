'use client';
import { CartProps } from '@/types/Product';
import { createContext, useContext, useEffect, useState } from 'react';

export interface SomeContextValue {
	cart: CartProps[];
	setCart: React.Dispatch<React.SetStateAction<CartProps[]>>;
}

const CartContext = createContext<SomeContextValue>({} as SomeContextValue);

const STORAGE_KEY = 'cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState<CartProps[]>([]);
	const [hydrated, setHydrated] = useState(false);

	// Load the saved cart once on mount (localStorage only exists in the browser)
	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			// Reading an external store once on mount is intentional here: a lazy
			// useState initializer would cause a server/client hydration mismatch.
			// eslint-disable-next-line react-hooks/set-state-in-effect
			if (saved) setCart(JSON.parse(saved));
		} catch {
			// ignore corrupted / unavailable storage
		}
		setHydrated(true);
	}, []);

	// Persist in a single place instead of in every AddToCartButton
	useEffect(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
		} catch {
			// ignore quota / private mode errors
		}
	}, [cart, hydrated]);

	return (
		<CartContext.Provider value={{ cart, setCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
