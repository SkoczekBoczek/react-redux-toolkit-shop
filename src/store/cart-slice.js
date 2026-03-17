import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartQuantity: 0, items: [], changed: false };

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState,
	reducers: {
		repaceCart: (state, action) => {
			state.cartQuantity = action.payload.cartQuantity;
			state.items = action.payload.items;
		},
		addItem: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.cartQuantity++;
			state.changed = true;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					name: newItem.title,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			const existingItem = state.items.find((item) => item.id === itemId);
			state.cartQuantity--;
			state.changed = true;
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== itemId);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;
