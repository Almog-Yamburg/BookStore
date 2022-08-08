import { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login-form.styles.css";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { AuthContext } from "../../../contexts/Auth.context";
import { LoginFormData } from "../../../models/login-form.model";
import { login } from "../../../services/user.service";

import loginReducer, {
    LOGIN_FORM_INITIAL_STATE,
} from "../../../reducers/login-form.reducer";
import { updateAction } from "../../../actions/login-form.actions";

import {
    initialTokenAction,
    initialUserTypeAction,
} from "../../../actions/assign-access.action";

import FormInputContainer from "../../../components/form/form-input-container/FormInputContainer.component";

const LoginForm = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [loginFormState, dispatchLoginFormState] = useReducer(
        loginReducer,
        LOGIN_FORM_INITIAL_STATE
    );

    // Validate The Email Input - Function that validates the users input for the email input tag
    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === "") {
            dispatchLoginFormState(
                updateAction(
                    emailInput,
                    false,
                    "Please enter an email address",
                    "email"
                )
            );

            return;
        }

        if (!isEmail(emailInput)) {
            dispatchLoginFormState(
                updateAction(
                    emailInput,
                    false,
                    "Please enter a valid email address",
                    "email"
                )
            );

            return;
        }

        dispatchLoginFormState(updateAction(emailInput, true, "", "email"));
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === "") {
            dispatchLoginFormState(
                updateAction(
                    passwordInput,
                    false,
                    "Please enter a password",
                    "password"
                )
            );

            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchLoginFormState(
                updateAction(
                    passwordInput,
                    false,
                    "You must enter a password with at least 8 characters which includes one capital letter, number and special character",
                    "password"
                )
            );
        }

        dispatchLoginFormState(
            updateAction(passwordInput, true, "", "password")
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const values = loginFormState.values;
        const validities = loginFormState.validities;

        if (
            values.email === "" ||
            values.password === "" ||
            !validities.email ||
            !validities.password
        ) {
            return;
        }

        const { email, password } = loginFormState.values;

        const data = new LoginFormData(email, password);

        try {
            const response = await login(data);
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
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <FormInputContainer
                    id="email"
                    labelText="Email:"
                    required={false}
                    type="email"
                    isValid={loginFormState.validities.email}
                    errorMessage={loginFormState.errorMessages.email}
                    handleInput={handleEmailInput}
                />

                <FormInputContainer
                    id="password"
                    labelText="Password:"
                    required={false}
                    type="password"
                    isValid={loginFormState.validities.password}
                    errorMessage={loginFormState.errorMessages.password}
                    handleInput={handlePasswordInput}
                />
            </div>

            <Link to="/signup" className="signup-link">
                Don't have an account? Signup...
            </Link>

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
