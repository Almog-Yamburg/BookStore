const cartActionTypes = {
    INITIAL_CART: "UPDATE_CART",
    UPDATE_CART: "REMOVE_ITEM",
    CHECKOUT: "CHECKOUT",
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
};

export const initialCartAction = (cartItems) => {
    const action = {
        type: cartActionTypes.INITIAL_CART,
        payload: {
            cartItems: cartItems,
        },
    };

    return action;
};

export const updateCartAction = (itemID, itemPrice) => {
    const action = {
        type: cartActionTypes.UPDATE_CART,
        payload: {
            itemID: itemID,
            itemPrice: itemPrice,
        },
    };

    return action;
};

export const checkoutCartAction = () => {
    const action = {
        type: cartActionTypes.CHECKOUT,
        payload: {},
    };

    return action;
};

export const increment = (itemID, bookPrice, cart) => {
    const action = {
        type: cartActionTypes.INCREMENT,
        payload: {
            itemID: itemID,
            bookPrice: bookPrice,
            cart: cart,
        },
    };

    return action;
};

export const decrement = (itemID, bookPrice, cart) => {
    const action = {
        type: cartActionTypes.DECREMENT,
        payload: {
            itemID: itemID,
            bookPrice: bookPrice,
            cart: cart,
        },
    };

    return action;
};

export default cartActionTypes;
