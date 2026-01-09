import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existingItem = items.find(item => item.product_id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.product_id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    });
                } else {
                    set({
                        items: [...items, {
                            product_id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            quantity
                        }]
                    });
                }
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map(item =>
                        item.product_id === productId
                            ? { ...item, quantity }
                            : item
                    )
                });
            },

            removeItem: (productId) => {
                set({
                    items: get().items.filter(item => item.product_id !== productId)
                });
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            },

            getItemsCount: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
