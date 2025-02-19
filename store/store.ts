import { Product } from '@/sanity.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the BasketItem type to represent items in the basket
export interface BasketItem {
    product: Product;
    quantity: number;
}

interface BasketState {
    items: BasketItem[];
    addItem: (product: Product) => void;
    removeItem: (productID: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (productID: string) => number;
    getGroupedItems: () => BasketItem[];
}

// Create Zustand Store
const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => set((state) => {
                // Check if item exists in basket
                const existingItem = state.items.find((i) => i.product._id === product._id);
                const stock = product.stock ?? 0;

                if (existingItem) {
                    // Do nothing if stock limit is reached
                    if (existingItem.quantity >= stock) {
                        return state;
                    }
                    // If item exists, increment quantity
                    return {
                        items: state.items.map((i) =>
                            i.product._id === product._id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        )
                    };
                } else {
                    // If item doesn't exist, add new item
                    return { items: [...state.items, { product, quantity: 1 }] };
                }
            }),

            removeItem: (productId: string) => set((state) => ({
                items: state.items.reduce((acc, item) => {
                    if (item.product._id === productId) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 })
                        }
                    } else {
                        acc.push(item)
                    }
                    return acc;
                }, [] as BasketItem[])
            })),

            clearBasket: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0)
            },

            getItemCount: (productID: string) => {
                const item = get().items.find(item => item.product._id === productID);
                return item ? item.quantity : 0
            },

            getGroupedItems: () => get().items
        }),
        {
            name: 'basket-store',
            // storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export default useBasketStore;