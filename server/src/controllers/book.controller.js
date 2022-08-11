import Book from "../models/book.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).send(new SuccessResponse(200, "Ok", "", { books }));
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
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

        res.status(200).send(new SuccessResponse(200, "Ok", "", { book }));
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const createBook = async (req, res) => {
    const bookData = req.body;
    const book = new Book(bookData);

    try {
        await book.save();

        res.status(201).send(
            new SuccessResponse(
                201,
                "Created",
                "Book was created Successfully",
                { book }
            )
        );
    } catch (error) {
        error.status = 400;
        error.statusText = "Bad request";
        next(error);
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

        res.status(202).send(
            new SuccessResponse(
                202,
                "Accepted",
                "Book was updated successfully",
                { updatedBook }
            )
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};

export const deleteBook = async (req, res) => {
    const bookID = req.params.id;

    try {
        await Book.findByIdAndDelete(bookID);

        res.status(200).send(
            new SuccessResponse(200, "Ok", "Book was deleted successfully")
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};
