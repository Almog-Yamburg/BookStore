import Cart from "../models/cart.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const getCart = async (req, res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({
            owner: user._id,
        });

        if (!cart) throw new Error();

        if (cart.books.length > 0) {
            await cart.populate("books.bookID");
        }

        res.status(200).send(new SuccessResponse(200, "Ok", "", { cart }));
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const addBookToCart = async (req, res) => {
    const user = req.user;
    const bookID = req.body.bookID;
    const quantity = req.body.quantity;

    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });
    }

    if (!quantity) {
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });
    }

    try {
        const cart = await Cart.findOne({
            owner: user._id,
        });
        if (!cart) {
            throw new Error();
        }
        const books = cart.books;

        if (!books.find((bookDoc) => bookDoc.bookID.toString() === bookID)) {
            cart.books.unshift({
                bookID: bookID,
                quantity: quantity,
            });
        } else {
            books.map((bookDoc) => {
                if (bookDoc.bookID.toString() === bookID)
                    bookDoc.quantity += quantity;
            });
        }

        await cart.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "The book was added to your cart", {
                cart,
            })
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const updateQuantity = async (req, res) => {
    const user = req.user;
    const bookID = req.body.bookID;
    const quantity = req.body.quantity;

    if (!bookID)
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });

    if (quantity < 1 || quantity > 10)
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });

    try {
        const cart = await Cart.findOne({
            owner: user._id,
        });
        if (!cart) {
            throw new Error();
        }

        if (
            !cart.books.find((bookDoc) => bookDoc.bookID.toString() === bookID)
        ) {
            return res.status(400).send({
                status: 400,
                statusText: "Bad Request",
                message: "",
            });
        } else {
            cart.books.map((bookDoc) => {
                if (bookDoc.bookID.toString() === bookID) {
                    bookDoc.quantity = quantity;
                }
            });
        }

        await cart.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "Your cart has been updated", {
                cart,
            })
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const removeFromCart = async (req, res) => {
    const user = req.user;

    const bookID = req.body.bookID;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });
    }

    try {
        const cart = await Cart.findOne({
            owner: user._id,
        });
        if (!cart) {
            throw new Error();
        }

        if (
            !cart.books.find((bookDoc) => bookDoc.bookID.toString() === bookID)
        ) {
            return res.status(400).send({
                status: 400,
                statusText: "Bad Request",
                message: "",
            });
        }

        cart.books = cart.books.filter(
            (bookDoc) => bookDoc.bookID.toString() !== bookID
        );

        await cart.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "The item deleted successfully", {
                cart,
            })
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const checkout = async (req, res) => {
    const user = req.user;

    try {
        if (!user) throw new Error();

        const cart = await Cart.findOne({
            owner: user._id,
        });

        if (cart.books.length === 0) {
            return res.status(400).send({
                status: 400,
                statusText: "Bad Request",
                message: "",
            });
        }

        cart.books = [];
        await cart.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "Checkout successfully", { cart })
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};
