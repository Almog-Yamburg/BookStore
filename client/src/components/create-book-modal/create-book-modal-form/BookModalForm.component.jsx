import React, { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./book-modal-form.styles.css";

import { AuthContext } from "../../../contexts/Auth.context";
import { BookContext } from "../../../contexts/Book.context";

import bookModalFormReducer, {
    BOOK_MODAL_FORM_INITIAL_STATE,
} from "../../../reducers/book-modal-form.reducer.js";
import * as BookModalFormActions from "../../../actions/book-modal-form.action.js";

import * as BookActions from "../../../actions/book-action.js";

import FormInputContainer from "../../form/form-input-container/FormInputContainer.component";

const BookModalForm = (props) => {
    const navigate = useNavigate();
    const bookID = props.id;

    const authContextValue = useContext(AuthContext);
    const bookContextValue = useContext(BookContext);

    const [bookModalFormState, dispatchBookModalFormState] = useReducer(
        bookModalFormReducer,
        BOOK_MODAL_FORM_INITIAL_STATE
    );

    const handleTitleInput = (event) => {
        const titleInput = event.target.value.trim();

        if (titleInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateTitleName(
                    titleInput,
                    false,
                    "Please enter book title"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateTitleName(titleInput, true, "")
        );
    };

    const handleAuthorInput = (event) => {
        const authorInput = event.target.value.trim();

        if (authorInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateAuthorName(
                    authorInput,
                    false,
                    "Please enter author name"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAuthorName(authorInput, true, "")
        );
    };

    const handleBookCover = (event) => {
        const bookCoverInput = event.target.value.trim();

        if (bookCoverInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateBookCover(
                    bookCoverInput,
                    false,
                    "Please enter bookCover jpg"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateBookCover(bookCoverInput, true, "")
        );
    };

    const handleDescription = (event) => {
        const descriptionInput = event.target.value.trim();

        if (descriptionInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateDescription(
                    descriptionInput,
                    false,
                    "Please enter a book description"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateDescription(descriptionInput, true, "")
        );
    };

    const handlePages = (event) => {
        const pagesInput = event.target.value.trim();

        if (pagesInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updatePages(
                    pagesInput,
                    false,
                    "Please enter book pages amount"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updatePages(pagesInput, true, "")
        );
    };

    const handlePrice = (event) => {
        const priceInput = event.target.value.trim();

        if (priceInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updatePrice(
                    priceInput,
                    false,
                    "Please enter book price"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updatePrice(priceInput, true, "")
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !bookModalFormState.validities.title ||
            !bookModalFormState.validities.author ||
            !bookModalFormState.validities.bookCover ||
            !bookModalFormState.validities.description ||
            !bookModalFormState.validities.pages ||
            !bookModalFormState.validities.price ||
            bookModalFormState.values.title === "" ||
            bookModalFormState.values.author === "" ||
            bookModalFormState.values.bookCover === "" ||
            bookModalFormState.values.description === "" ||
            bookModalFormState.values.pages === "" ||
            bookModalFormState.values.price === ""
        ) {
            return;
        }

        const bookModalFormValues = bookModalFormState.values;

        const data = {
            title: bookModalFormValues.title,
            author: bookModalFormValues.author,
            bookCover: bookModalFormValues.bookCover,
            description: bookModalFormValues.description,
            pages: bookModalFormValues.pages,
            price: bookModalFormValues.price,
        };

        try {
            const response = await fetch("http://localhost:3000/books/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authContextValue.assignAccessState.token,
                },
                body: JSON.stringify(data),
            });

            if (response.status !== 201) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.message;
            const bookData = responseObj.data.book;

            bookContextValue.dispatchBook(BookActions.createBook(bookData));

            alert(message);
            props.hideBookModal();
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (
            !bookModalFormState.validities.title ||
            !bookModalFormState.validities.author ||
            !bookModalFormState.validities.bookCover ||
            !bookModalFormState.validities.description ||
            !bookModalFormState.validities.pages ||
            !bookModalFormState.validities.price
        ) {
            return;
        }

        const bookModalFormValues = bookModalFormState.values;

        const data = {
            title: bookModalFormValues.title
                ? bookModalFormValues.title
                : undefined,
            author: bookModalFormValues.author
                ? bookModalFormValues.author
                : undefined,
            bookCover: bookModalFormValues.bookCover
                ? bookModalFormValues.bookCover
                : undefined,
            description: bookModalFormValues.description
                ? bookModalFormValues.description
                : undefined,
            pages: bookModalFormValues.pages
                ? bookModalFormValues.pages
                : undefined,
            price: bookModalFormValues.price
                ? bookModalFormValues.price
                : undefined,
        };

        try {
            const response = await fetch(
                `http://localhost:3000/books/${bookID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authContextValue.assignAccessState.token,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.status !== 202) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.message;
            const updatedBookData = responseObj.data.updateBook;

            bookContextValue.dispatchBook(
                BookActions.updateBook(updatedBookData)
            );

            console.log(updatedBookData);

            alert(message);
            props.hideBookModal();
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/books/${bookID}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: authContextValue.assignAccessState.token,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.message;

            bookContextValue.dispatchBook(BookActions.deleteBook(bookID));

            alert(message);
            props.hideBookModal();
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <form className="book-modal-form" onSubmit={handleSubmit}>
            <div className="modal-form-group">
                <FormInputContainer
                    id="title"
                    labelText="Title:"
                    required={false}
                    isValid={bookModalFormState.validities.title}
                    errorMessage={bookModalFormState.errorMessages.title}
                    handleInput={handleTitleInput}
                    placeholder={props.title}
                />

                <FormInputContainer
                    id="author"
                    labelText="Author:"
                    required={false}
                    isValid={bookModalFormState.validities.author}
                    errorMessage={bookModalFormState.errorMessages.author}
                    handleInput={handleAuthorInput}
                    placeholder={props.author}
                />

                <FormInputContainer
                    id="bookCover"
                    labelText="BookCover:"
                    required={false}
                    isValid={bookModalFormState.validities.bookCover}
                    errorMessage={bookModalFormState.validities.errorMessages}
                    handleInput={handleBookCover}
                    placeholder={props.bookCover}
                />

                <FormInputContainer
                    id="description"
                    labelText="Description:"
                    required={false}
                    isValid={bookModalFormState.validities.bookCover}
                    errorMessage={bookModalFormState.validities.errorMessages}
                    handleInput={handleDescription}
                    placeholder={props.description}
                />

                <FormInputContainer
                    id="pages"
                    labelText="Pages:"
                    required={false}
                    isValid={bookModalFormState.validities.pages}
                    errorMessage={bookModalFormState.validities.errorMessages}
                    handleInput={handlePages}
                    placeholder={props.pages}
                />

                <FormInputContainer
                    id="price"
                    labelText="Price:"
                    required={false}
                    isValid={bookModalFormState.validities.price}
                    errorMessage={bookModalFormState.validities.errorMessages}
                    handleInput={handlePrice}
                    placeholder={props.price}
                />
            </div>
            {!props.isNewBook ? (
                <div className="update-and-delete-modal-form-btn">
                    <button
                        className="update-btn"
                        type="submit"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>

                    <button
                        className="delete-btn"
                        type="submit"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className="modal-form-btn">
                    <button type="submit">Save</button>
                </div>
            )}
        </form>
    );
};

export default BookModalForm;
