import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home-page.styles.css";

import Loader from "../../components/shared/loader/Loader.component";
import Book from "../../components/book/Book.component";

const HomePage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch("http://localhost:3000/books");

                if (!response) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const books = responseObj.data.books;

                setBooks(books);

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
        <main className="home-page">
            <div className="books-container">
                {books.map((book) => {
                    return (
                        <Book
                            homePage={true}
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

export default HomePage;
