import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const cartQuantity = useSelector((state) => state.cart.cartQuantity);

	const handleToggle = () => {
		dispatch(uiAction.toggle());
	};

	return (
		<button className={classes.button} onClick={handleToggle}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</button>
	);
};

export default CartButton;
