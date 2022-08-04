import { useContext } from "react";
import "./cart-item.styles.css";

import { AuthContext } from "../../../../contexts/Auth.context";
import { CartContext } from "../../../../contexts/Cart.context";

import {
    updateCartAction,
    increment,
    decrement,
} from "../../../../actions/cart.actions";

import environments from "../../../../environments/environments.js";

const CartItem = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);
    const API_URL = environments.API_URL;

    const handleRemoveFromCart = async () => {
        const data = { bookID: props.id };

        try {
            const response = await fetch(`${API_URL}/cart/remove-from-cart`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authContextValue.assignAccessState.token,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            cartContextValue.dispatchCart(
                updateCartAction(props.id, props.price)
            );
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleIncrement = async () => {
        const data = {
            bookID: props.id,
            quantity: props.quantity,
        };

        try {
            const response = await fetch(`${API_URL}/cart/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authContextValue.assignAccessState.token,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            cartContextValue.dispatchCart(increment(props.id));
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleDecrement = async () => {
        const data = {
            bookID: props.id,
            quantity: props.quantity,
        };

        try {
            const response = await fetch(`${API_URL}/cart/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authContextValue.assignAccessState.token,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            cartContextValue.dispatchCart(decrement(props.id));
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="cart-item">
            <img src={props.bookCover} alt={props.title} />

            <div className="meta-data">
                <h3>{props.title}</h3>
                <h4>{props.author}</h4>
            </div>

            <div className="quantity">
                <i className="minus" onClick={handleDecrement}>
                    -
                </i>
                <input
                    className="quantity-box"
                    type="text"
                    placeholder={props.quantity}
                ></input>
                <i className="plus" onClick={handleIncrement}>
                    +
                </i>
            </div>

            <div>{`$${props.price * props.quantity}`}</div>

            <button onClick={handleRemoveFromCart} className="remove-btn">
                Remove
            </button>
        </div>
    );
};

export default CartItem;
