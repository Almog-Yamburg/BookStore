import React, { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup-form.styles.css";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { AuthContext } from "../../../contexts/Auth.context";
import {
    initialTokenAction,
    initialUserTypeAction,
} from "../../../actions/assign-access.action";
import { SignupFormData } from "../../../models/signup-form.model";

import { signup } from "../../../services/user.service";

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
                signupFormActions.updateAction(
                    firstNameInput,
                    false,
                    "Please enter your first name",
                    "firstName"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateAction(
                firstNameInput,
                true,
                "",
                "firstName"
            )
        );
    };

    const handleLastNameInput = (event) => {
        const lastNameInput = event.target.value.trim();

        if (lastNameInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    lastNameInput,
                    false,
                    "Please enter your last name",
                    "lastName"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateAction(lastNameInput, true, "", "lastName")
        );
    };

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    emailInput,
                    false,
                    "Please enter an email address",
                    "email"
                )
            );

            return;
        }

        if (!isEmail(emailInput)) {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    emailInput,
                    false,
                    "Please enter a valid email address",
                    "email"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateAction(emailInput, true, "", "email")
        );
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    passwordInput,
                    false,
                    "Please enter a password",
                    "password"
                )
            );

            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    passwordInput,
                    false,
                    "You must enter a password with at least 8 characters which includes one capital letter, number and special character",
                    "password"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateAction(passwordInput, true, "", "password")
        );
    };

    const handleRepeatedPasswordInput = (event) => {
        const repeatedPasswordInput = event.target.value.trim();

        if (repeatedPasswordInput === "") {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    repeatedPasswordInput,
                    false,
                    "Please enter your password again",
                    "repeatedPassword"
                )
            );

            return;
        }

        if (repeatedPasswordInput !== signupFormState.values.password) {
            dispatchSignUpFormState(
                signupFormActions.updateAction(
                    repeatedPasswordInput,
                    false,
                    "Your passwords don't match",
                    "repeatedPassword"
                )
            );

            return;
        }

        dispatchSignUpFormState(
            signupFormActions.updateAction(
                repeatedPasswordInput,
                true,
                "",
                "repeatedPassword"
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

        const { firstName, lastName, email, password } = signupFormState.values;

        const data = new SignupFormData(firstName, lastName, email, password);

        try {
            const response = await signup(data);
            const { token } = response.data;

            localStorage.setItem("USER", token);
            authContextValue.dispatchAssignAccessState(
                initialTokenAction(token)
            );
            authContextValue.dispatchAssignAccessState(
                initialUserTypeAction("USER")
            );

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
