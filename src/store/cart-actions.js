import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://redux-toolkit-214f7-default-rtdb.firebaseio.com/cart.json",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error("Could not fetch cart data");
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.repaceCart({
					items: cartData.items || [],
					cartQuantity: cartData.cartQuantity,
				}),
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				}),
			);
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			}),
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://redux-toolkit-214f7-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						items: cart.items,
						cartQuantity: cart.cartQuantity,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Sending data failed");
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully!",
				}),
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed!",
				}),
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};
