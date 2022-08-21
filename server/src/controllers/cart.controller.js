import Cart from "../models/cart.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const getCart = async (req, res, next) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({
            ownerID: user._id,
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

export const addBookToCart = async (req, res, next) => {
    const user = req.user;
    const { bookID, quantity } = req.body;

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
            ownerID: user._id,
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

            await cart.populate("books.bookID");
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

export const updateQuantity = async (req, res, next) => {
    const user = req.user;
    const bookID = req.body.itemID;
    const quantity = req.body.quantity;

    if (!bookID)
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });

    if (!quantity)
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });

    try {
        const cart = await Cart.findOne({
            ownerID: user._id,
        });
        if (!cart) {
            throw new Error();
        }

        const book = cart.books.find(
            (bookDoc) => bookDoc.bookID.toString() === bookID
        );
        if (!book) throw new Error();

        book.quantity = quantity;

        await cart.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "Your cart has been updated", {
                cart,
            })
        );
    } catch (error) {
        console.log(error);
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    const user = req.user;
    const bookID = req.body.itemID;

    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });
    }

    try {
        const cart = await Cart.findOne({
            ownerID: user._id,
        });
        if (!cart) {
            throw new Error();
        }

        const bookObj = cart.books.find(
            (book) => book.bookID.toString() === bookID
        );
        if (!bookObj) {
            return res.status(400).send({
                status: 400,
                statusText: "Bad Request",
                message: "",
            });
        }

        cart.books = cart.books.filter(
            (bookDoc) => bookDoc._id !== bookObj._id
        );

        await cart.populate("books.bookID");

        await cart.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "The item deleted successfully", {
                cart,
            })
        );
    } catch (error) {
        console.log(error);
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const checkout = async (req, res, next) => {
    const user = req.user;

    try {
        if (!user) throw new Error();

        const cart = await Cart.findOne({
            ownerID: user._id,
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
