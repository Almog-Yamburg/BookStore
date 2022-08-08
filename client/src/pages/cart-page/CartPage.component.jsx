import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart-page.styles.css";

import { AuthContext } from "../../contexts/Auth.context";
import { CartContext } from "../../contexts/Cart.context";
import {
    initialCartAction,
    checkoutCartAction,
} from "../../actions/cart.actions";

import Loader from "../../components/shared/loader/Loader.component";
import CartItems from "./cart-items/CartItems.component";
import { getUserCart, checkout } from "../../services/cart.service";
import { LOADER_TIMEOUT } from "../../constants/constants";

const CartPage = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const [isLoading, setIsLoading] = useState(true);

    const handleCheckout = async () => {
        try {
            const response = await checkout(authContextValue);
            const message = response.message;
            alert(message);

            cartContextValue.dispatchCart(checkoutCartAction());
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await getUserCart(authContextValue);
                const { cart } = response.data;

                cartContextValue.dispatchCart(initialCartAction(cart.books));

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
            } catch (error) {
                navigate("*");
            }
        };

        const userToken = localStorage.getItem("USER");

        if (!userToken) {
            navigate("/");
        }

        getCart();
    }, []);

    return isLoading ? (
        <Loader />
    ) : cartContextValue.cart.items.length === 0 ? (
        <main className="cart-page">
            <h1>Your cart is empty</h1>
        </main>
    ) : (
        <main className="cart-page">
            <CartItems />

            <div>
                <h3>{`Total Price: $${cartContextValue.cart.price}`}</h3>

                <button
                    type="button"
                    className="checkout-btn"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </main>
    );
};
export default CartPage;
