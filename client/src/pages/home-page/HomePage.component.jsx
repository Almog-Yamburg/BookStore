import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home-page.styles.css";

import Loader from "../../components/shared/loader/Loader.component";
import Book from "../../components/book/Book.component";
import { getAllBooks } from "../../services/book.service";
import { LOADER_TIMEOUT } from "../../constants/constants";

const HomePage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await getAllBooks();
                const { books } = response.data;

                setBooks(books);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
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
