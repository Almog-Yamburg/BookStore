import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./book-page.styles.css";

import { AuthContext } from "../../contexts/Auth.context";
import { CartContext } from "../../contexts/Cart.context";
import { getOneBook } from "../../services/book.service";

import { LOADER_TIMEOUT } from "../../constants/constants";
import { addToCart, updateQuantity } from "../../services/cart.service";

import Loader from "../../components/shared/loader/Loader.component";
import { BookPageData } from "../../models/book-page.model";

const BookPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const bookID = params.bookID;

    const handleIncrement = () => {
        if (quantity < 10) setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
        if (!authContextValue.assignAccessState.userType === "USER") {
            alert("You must be logged in to your account");

            return;
        }

        const data = new BookPageData(params.bookID, quantity);

        try {
            const response = await addToCart(data, authContextValue);
            const message = response.message;

            alert(message);
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await getOneBook(bookID);
                const { book } = response.data;

                setBook(book);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
            } catch (error) {
                navigate("*");
            }
        };

        getBook();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="book-page">
            <div className="book-details">
                <img src={book.bookCover} alt={book.bookTitle} />
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>

                <div className="meta-data">
                    <div>
                        <span>Pages: </span>
                        <span>{book.pages}</span>
                    </div>

                    <div>
                        <span>Price: </span>
                        <span>{book.price}</span>
                    </div>
                </div>

                <div className="quantity">
                    <i className="minus" onClick={handleDecrement}>
                        -
                    </i>
                    <input
                        className="quantity-box"
                        type="text"
                        placeholder={quantity}
                    ></input>
                    <i className="plus" onClick={handleIncrement}>
                        +
                    </i>
                </div>

                <button onClick={handleAddToCart}>Add To Cart</button>

                <p className="description">{book.description}</p>
            </div>
        </main>
    );
};

export default BookPage;
