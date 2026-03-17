import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "./store/ui-slice";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.isOpen);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				uiAction.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data!",
				}),
			);
			const response = await fetch(
				"https://redux-toolkit-214f7-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(cart),
				},
			);

			if (!response.ok) {
				throw new Error("Sending data failed");
			}

			const responseData = await response.json();
			dispatch(
				uiAction.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully!",
				}),
			);
		};

		if (isInitial) {
			isInitial = false;
			return;
		}

		sendCartData().catch((error) => {
			dispatch(
				uiAction.showNotification({
					status: "error",
					title: "error",
					message: "Sending cart data failed!",
				}),
			);
		});
	}, [cart, dispatch]);

	useEffect(() => {
		if (
			notification &&
			(notification.status === "success" || notification.status === "error")
		) {
			const timer = setTimeout(() => {
				dispatch(uiAction.clearNotification());
			}, 3000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [notification, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}

			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
