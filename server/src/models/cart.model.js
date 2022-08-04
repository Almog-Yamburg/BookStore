import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Owner ID required"],
    },
    books: [
        {
            bookID: {
                type: mongoose.SchemaTypes.ObjectId,
                required: [true, "Book ID required"],
                ref: "Book",
            },

            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: 1,
                max: 10,
            },
        },
    ],
});

cartSchema.methods.toJSON = function () {
    const cart = this;

    const cartObj = cart.toObject();
    delete cartObj.__v;

    return cartObj;
};

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
