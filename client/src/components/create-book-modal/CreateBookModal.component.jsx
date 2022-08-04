import React from "react";
import BookModalForm from "./create-book-modal-form/BookModalForm.component";
import "./create-book-modal.styles.css";

const CreateBookModal = (props) => {
    return (
        <div className={`modal-backdrop ${props.className}`}>
            <div className="create-book-modal">
                <button
                    type="button"
                    className="close-btn"
                    onClick={props.hideBookModal}
                >
                    X
                </button>

                <h2>Create New Book</h2>

                <BookModalForm
                    isNewBook={props.isNewBook}
                    id={props.id}
                    hideBookModal={props.hideBookModal}
                    title={props.title}
                    author={props.author}
                    bookCover={props.bookCover}
                    description={props.description}
                    pages={props.pages}
                    price={props.price}
                />
            </div>
        </div>
    );
};

export default CreateBookModal;
