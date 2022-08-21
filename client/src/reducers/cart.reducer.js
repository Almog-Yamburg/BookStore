import cartActionTypes from "../actions/cart.actions.js";

export const CART_INITIAL_STATE = {
    items: [],
    price: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case cartActionTypes.INITIAL_CART: {
            const cartItems = action.payload.cartItems;

            let price = 0;
            for (let i = 0; i < cartItems.length; i++) {
                const cartItem = cartItems[i];

                price += cartItem.bookID.price * cartItem.quantity;
            }

            const updatedState = {
                items: cartItems,
                price: price.toFixed(2),
            };

            return updatedState;
        }

        case cartActionTypes.UPDATE_CART: {
            const itemID = action.payload.itemID;
            const itemPrice = action.payload.itemPrice;

            const updateCartItems = [...state.items].filter(
                (item) => item.bookID._id !== itemID
            );
            const updatePrice = state.price - itemPrice;

            const updatedState = {
                items: updateCartItems,
                price: updatePrice.toFixed(2),
            };

            return updatedState;
        }

        case cartActionTypes.CHECKOUT: {
            const updatedState = { items: [], price: 0 };

            return updatedState;
        }

        case cartActionTypes.INCREMENT: {
            const { itemID, bookPrice, cart } = action.payload;

            let price = +cart.price;

            const itemsState = JSON.parse(JSON.stringify(state.items));

            const itemIndex = itemsState.findIndex(
                (item) => item.bookID._id === itemID
            );

            itemsState[itemIndex].quantity++;

            price += bookPrice;

            const updatedState = {
                items: itemsState,
                price: price.toFixed(2),
            };

            return updatedState;
        }
        case cartActionTypes.DECREMENT: {
            const { itemID, bookPrice, cart } = action.payload;
            let price = cart.price;

            const itemsState = JSON.parse(JSON.stringify(state.items));

            const itemIndex = itemsState.findIndex(
                (item) => item.bookID._id === itemID
            );
            itemsState[itemIndex].quantity--;

            price -= bookPrice;

            const updatedState = {
                items: itemsState,
                price: price.toFixed(2),
            };

            return updatedState;
        }

        default:
            return state;
    }
};

export default cartReducer;
