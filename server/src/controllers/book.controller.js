import Book from "../models/book.model.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.send({
            status: 200,
            statusText: "Ok",
            data: { books: books },
            message: "",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};

export const getBook = async (req, res) => {
    const bookID = req.params.id;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });
    }

    try {
        const book = await Book.findById(bookID);
        if (!book) throw new Error();

        res.send({
            status: 200,
            statusText: "Ok",
            data: { book: book },
            message: "",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};

export const createBook = async (req, res) => {
    const bookData = req.body;
    const book = new Book(bookData);

    try {
        await book.save();

        res.status(201).send({
            status: 201,
            statusText: "Created",
            data: { book: book },
            message: "Book was created successfully",
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusText: "bad Request",
            message: "",
        });
    }
};

export const updateBook = async (req, res) => {
    const bookID = req.params.id;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: "Bad Request",
            message: "",
        });
    }

    const bookData = req.body;

    try {
        const updateBook = await Book.findByIdAndUpdate(bookID, bookData);
        if (!updateBook) throw new Error();

        const updatedBook = await Book.findById(bookID);
        if (!updatedBook) throw new Error();

        res.status(202).send({
            status: 202,
            statusText: "Accepted",
            data: { updateBook: updatedBook },
            message: "Book was updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};

export const deleteBook = async (req, res) => {
    const bookID = req.params.id;

    try {
        await Book.findByIdAndDelete(bookID);

        res.status(200).send({
            status: 200,
            statusText: "Ok",
            data: {},
            message: "Book was deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};
