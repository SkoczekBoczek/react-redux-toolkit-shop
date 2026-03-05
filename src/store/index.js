import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUiState = { isOpen: false };

const uiSlice = createSlice({
	name: "ui",
	initialState: initialUiState,
	reducers: {
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

const initialCartState = { cartQuantity: 0, items: [] };

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState,
	reducers: {
		addItem: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.cartQuantity++;

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
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== itemId);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		cart: cartSlice.reducer,
	},
});

export const uiAction = uiSlice.actions;
export const cartAction = cartSlice.actions;
export default store;
