import React, { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup-form.styles.css";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { AuthContext } from "../../../contexts/Auth.context";

import signupFormReducer, {
    SIGNUP_FORM_INITIAL_STATE,
} from "../../../reducers/signup-form.reducer";

import * as signupFormActions from "../../../actions/signup-form.actions";
import FormInputContainer from "../../../components/form/form-input-container/FormInputContainer.component";

const SignupForm = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [signupFormState, dispatchSignUpFormState] = useReducer(
        signupFormReducer,
        SIGNUP_FORM_INITIAL_STATE
    );

    const handleFirstNameInput = (event) => {
        const firstNameInput = event.target.value.trim();

        if (firstNameInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateFirstName(
                    firstNameInput,
                    false,
                    "Please enter your first name"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateFirstName(firstNameInput, true, "")
        );
    };

    const handleLastNameInput = (event) => {
        const lastNameInput = event.target.value.trim();

        if (lastNameInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateLastName(
                    lastNameInput,
                    false,
                    "Please enter your last name"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateLastName(lastNameInput, true, "")
        );
    };

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateEmailAction(
                    emailInput,
                    false,
                    "Please enter an email address"
                )
            );

            return;
        }

        if (!isEmail(emailInput)) {
            dispatchSignUpFormState(
                signupFormActions.updateEmailAction(
                    emailInput,
                    false,
                    "Please enter a valid email address"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateEmailAction(emailInput, true, "")
        );
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updatedPasswordAction(
                    passwordInput,
                    false,
                    "Please enter a password"
                )
            );

            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchSignUpFormState(
                signupFormActions.updatedPasswordAction(
                    passwordInput,
                    false,
                    "You must enter a password with at least 8 characters which includes one capital letter, number and special character"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updatedPasswordAction(passwordInput, true, "")
        );
    };

    const handleRepeatedPasswordInput = (event) => {
        const repeatedPasswordInput = event.target.value.trim();

        if (repeatedPasswordInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updatedRepeatedPasswordAction(
                    repeatedPasswordInput,
                    false,
                    "Please enter your password again"
                )
            );

            return;
        }

        if (repeatedPasswordInput !== signupFormState.values.password) {
            dispatchSignUpFormState(
                signupFormActions.updatedRepeatedPasswordAction(
                    repeatedPasswordInput,
                    false,
                    "Your passwords don't match"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updatedRepeatedPasswordAction(
                repeatedPasswordInput,
                true,
                ""
            )
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !signupFormState.validities.firstName ||
            !signupFormState.validities.lastName ||
            !signupFormState.validities.email ||
            !signupFormState.validities.password ||
            !signupFormState.validities.repeatedPassword ||
            signupFormState.values.firstName === "" ||
            signupFormState.values.lastName === "" ||
            signupFormState.values.email === "" ||
            signupFormState.values.password === "" ||
            signupFormState.values.repeatedPassword === ""
        ) {
            return;
        }

        const signupFormValues = signupFormState.values;
        const data = {
            firstName: signupFormValues.firstName,
            lastName: signupFormValues.lastName,
            email: signupFormValues.email,
            password: signupFormValues.password,
        };

        try {
            // Fetch a response from the server - create a server request
            const response = await fetch("http://localhost:3000/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Check if the response is valid
            if (response.status !== 201) {
                throw new Error();
            }

            // Convert the response from JSON to object
            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem("USER", token);
            authContextValue.setToken(token);
            authContextValue.setUserType("USER");

            navigate("/");
        } catch (err) {
            alert("Something went wrong!");
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <FormInputContainer
                    id="first-name"
                    labelText="First Name:"
                    required={false}
                    isValid={signupFormState.validities.firstName}
                    errorMessage={signupFormState.errorMessages.firstName}
                    handleInput={handleFirstNameInput}
                />

                <FormInputContainer
                    id="last-name"
                    labelText="Last Name:"
                    required={false}
                    isValid={signupFormState.validities.lastName}
                    errorMessage={signupFormState.errorMessages.lastName}
                    handleInput={handleLastNameInput}
                />

                <FormInputContainer
                    id="email"
                    labelText="Email:"
                    required={false}
                    type="email"
                    isValid={signupFormState.validities.email}
                    errorMessage={signupFormState.errorMessages.email}
                    handleInput={handleEmailInput}
                />

                <FormInputContainer
                    id="password"
                    labelText="Password:"
                    required={false}
                    type="password"
                    isValid={signupFormState.validities.password}
                    errorMessage={signupFormState.errorMessages.password}
                    handleInput={handlePasswordInput}
                />

                <FormInputContainer
                    id="repeated-password"
                    labelText="Repeated Password:"
                    required={false}
                    type="password"
                    isValid={signupFormState.validities.repeatedPassword}
                    errorMessage={
                        signupFormState.errorMessages.repeatedPassword
                    }
                    handleInput={handleRepeatedPasswordInput}
                />
            </div>

            <Link to="/login" className="login-link">
                Have an account already? Login...
            </Link>

            <button type="submit">Signup</button>
        </form>
    );
};

export default SignupForm;
