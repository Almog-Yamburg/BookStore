import React, { useReducer, useContext } from "react";
import "./book-modal-form.styles.css";

import { AuthContext } from "../../../contexts/Auth.context";
import { BookContext } from "../../../contexts/Book.context";
import { BookModalData } from "../../../models/book-modal.model";
import {
    addNewBook,
    updateBook,
    deleteBook,
} from "../../../services/book.service";

import bookModalFormReducer, {
    BOOK_MODAL_FORM_INITIAL_STATE,
} from "../../../reducers/book-modal-form.reducer.js";
import * as BookModalFormActions from "../../../actions/book-modal-form.action.js";

import * as BookActions from "../../../actions/book-action.js";

import FormInputContainer from "../../form/form-input-container/FormInputContainer.component";

const BookModalForm = (props) => {
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
                BookModalFormActions.updateAction(
                    titleInput,
                    false,
                    "Please enter book title",
                    "titleInput"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAction(
                titleInput,
                true,
                "",
                "titleInput"
            )
        );
    };

    const handleAuthorInput = (event) => {
        const authorInput = event.target.value.trim();

        if (authorInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateAction(
                    authorInput,
                    false,
                    "Please enter author name",
                    "authorName"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAction(
                authorInput,
                true,
                "",
                "authorName"
            )
        );
    };

    const handleBookCover = (event) => {
        const bookCoverInput = event.target.value.trim();

        if (bookCoverInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateAction(
                    bookCoverInput,
                    false,
                    "Please enter bookCover jpg",
                    "bookCover"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAction(
                bookCoverInput,
                true,
                "",
                "bookCover"
            )
        );
    };

    const handleDescription = (event) => {
        const descriptionInput = event.target.value.trim();

        if (descriptionInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateAction(
                    descriptionInput,
                    false,
                    "Please enter a book description",
                    "description"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAction(
                descriptionInput,
                true,
                "",
                "description"
            )
        );
    };

    const handlePages = (event) => {
        const pagesInput = event.target.value.trim();

        if (pagesInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateAction(
                    pagesInput,
                    false,
                    "Please enter book pages amount",
                    "pages"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAction(pagesInput, true, "", "pages")
        );
    };

    const handlePrice = (event) => {
        const priceInput = event.target.value.trim();

        if (priceInput === "") {
            dispatchBookModalFormState(
                BookModalFormActions.updateAction(
                    priceInput,
                    false,
                    "Please enter book price",
                    "price"
                )
            );

            return;
        }

        dispatchBookModalFormState(
            BookModalFormActions.updateAction(priceInput, true, "", "price")
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

        const { title, author, bookCover, description, pages, price } =
            bookModalFormState.values;

        const data = new BookModalData(
            title,
            author,
            bookCover,
            description,
            pages,
            price
        );

        try {
            const response = await addNewBook(data, authContextValue);
            const message = response.message;
            const { bookData } = response.data;

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

        const { title, author, bookCover, description, pages, price } =
            bookModalFormState.values;

        const data = new BookModalData(
            title ? title : undefined,
            author ? author : undefined,
            bookCover ? bookCover : undefined,
            description ? description : undefined,
            pages ? pages : undefined,
            price ? price : undefined
        );

        try {
            const response = await updateBook(data, authContextValue, bookID);
            const message = response.message;
            const { updatedBook } = response.data;

            bookContextValue.dispatchBook(BookActions.updateBook(updatedBook));

            alert(message);
            props.hideBookModal();
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await deleteBook(authContextValue, bookID);
            const message = response.message;

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
