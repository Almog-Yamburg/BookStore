import Cart from "../models/cart.model.js";

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

        res.send({
            status: 200,
            statusText: "Ok",
            data: {
                cart: cart,
            },
            message: "",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
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
        console.log(quantity);
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

        res.send({
            status: 200,
            statusText: "Ok",
            data: {
                cart: cart,
            },
            message: "The book was added to your cart",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
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

        res.send({
            status: 200,
            statusText: "Ok",
            data: { cart: cart },
            message: "Your cart has been updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
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

        res.send({
            status: 200,
            statusText: "Ok",
            data: { cart: cart },
            message: "The item deleted successfully!",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
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

        res.send({
            status: 200,
            statusText: "Ok",
            data: { cart: cart },
            message: "Checkout successful",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};
