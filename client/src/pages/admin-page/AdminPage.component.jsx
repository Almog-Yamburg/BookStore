import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-page.styles.css";

import environments from "../../environments/environments.js";

import { initialBook } from "../../actions/book-action";

import Loader from "../../components/shared/loader/Loader.component";
import { AuthContext } from "../../contexts/Auth.context";
import { BookContext } from "../../contexts/Book.context";
import CreateBookModal from "../../components/create-book-modal/CreateBookModal.component";

import Book from "../../components/book/Book.component";

const AdminPage = () => {
    const navigate = useNavigate();
    const API_URL = environments.API_URL;

    const authContextValue = useContext(AuthContext);
    const bookContextValue = useContext(BookContext);

    const [isLoading, setIsLoading] = useState(true);

    const [bookModalClass, setBookModalClass] = useState("");
    const [isNewBook, setNewBook] = useState(true);
    const [bookID, setBookID] = useState("");

    const [values, setValues] = useState({
        title: "",
        author: "",
        bookCover: "",
        description: "",
        pages: "",
        price: "",
    });

    const hideBookModal = () => {
        setBookModalClass("");
        setBookID("");
    };

    const handleBookClick = (
        bookID,
        bookTitle,
        bookAuthor,
        bookCover,
        bookDescription,
        bookPages,
        bookPrice
    ) => {
        setBookID(bookID);
        setValues({
            title: bookTitle,
            author: bookAuthor,
            bookCover: bookCover,
            description: bookDescription,
            pages: bookPages,
            price: bookPrice,
        });
        setBookModalClass("show");
        setNewBook(false);
    };

    const handleButtonClick = () => {
        setBookModalClass("show");
        setNewBook(true);
    };

    useEffect(() => {
        if (authContextValue.assignAccessState.userType === "") {
            navigate("/admins/login");
        }

        const getBooks = async () => {
            try {
                const response = await fetch("http://localhost:3000/books");

                if (!response) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const books = responseObj.data.books;

                bookContextValue.dispatchBook(initialBook(books));

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            } catch (error) {
                navigate("*");
            }
        };

        getBooks();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="admin-page">
            <button onClick={handleButtonClick}>Add new Book</button>

            <CreateBookModal
                className={bookModalClass}
                hideBookModal={hideBookModal}
                isNewBook={isNewBook}
                id={bookID}
                title={values.title}
                author={values.author}
                bookCover={values.bookCover}
                description={values.description}
                pages={values.pages}
                price={values.price}
            />

            <div className="books-container">
                {bookContextValue.book.map((book) => {
                    return (
                        <Book
                            handleAdminBookClick={() =>
                                handleBookClick(
                                    book._id,
                                    book.title,
                                    book.author,
                                    book.bookCover,
                                    book.description,
                                    book.pages,
                                    book.price
                                )
                            }
                            homePage={false}
                            id={book._id}
                            title={book.title}
                            author={book.author}
                            bookCover={book.bookCover}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default AdminPage;
