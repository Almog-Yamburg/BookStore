import React, { useContext } from "react";
import "./cart-item.styles.css";

import { AuthContext } from "../../../../contexts/Auth.context";
import { CartContext } from "../../../../contexts/Cart.context";
import { cartData } from "../../../../models/cart.model";
import {
    removeFromCart,
    updateQuantity,
} from "../../../../services/cart.service";

import {
    updateCartAction,
    increment,
    decrement,
} from "../../../../actions/cart.actions";

const CartItem = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const cart = cartContextValue.cart;

    const handleRemoveFromCart = async () => {
        const data = new cartData(props.id);

        try {
            await removeFromCart(data, authContextValue);

            cartContextValue.dispatchCart(
                updateCartAction(props.id, props.price)
            );
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleIncrement = async () => {
        if (props.quantity >= 10) {
            alert("Cant add more then 10 copies!");
            return;
        }
        const data = new cartData(props.id, props.quantity);

        try {
            await updateQuantity(data, authContextValue);

            cartContextValue.dispatchCart(
                increment(props.id, props.price, cart)
            );
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleDecrement = async () => {
        if (props.quantity <= 1) return;
        const data = new cartData(props.id, props.quantity);

        try {
            await updateQuantity(data, authContextValue);

            cartContextValue.dispatchCart(
                decrement(props.id, props.price, cart)
            );
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
