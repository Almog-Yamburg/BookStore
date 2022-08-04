import { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin-login-form.styles.css";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { AuthContext } from "../../../../contexts/Auth.context";

import loginReducer, {
    LOGIN_FORM_INITIAL_STATE,
} from "../../../../reducers/login-form.reducer.js";
import {
    updateEmailAction,
    updatedPasswordAction,
} from "../../../../actions/login-form.actions.js";

import {
    initialTokenAction,
    initialUserTypeAction,
} from "../../../../actions/assign-access.action.js";

import FormInputContainer from "../../../../components/form/form-input-container/FormInputContainer.component";

const AdminLoginForm = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [loginFormState, dispatchLoginFormState] = useReducer(
        loginReducer,
        LOGIN_FORM_INITIAL_STATE
    );

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === "") {
            dispatchLoginFormState(
                updateEmailAction(
                    emailInput,
                    false,
                    "Please enter an email address"
                )
            );

            return;
        }

        if (!isEmail(emailInput)) {
            dispatchLoginFormState(
                updateEmailAction(
                    emailInput,
                    false,
                    "Please enter a valid email address"
                )
            );

            return;
        }

        dispatchLoginFormState(updateEmailAction(emailInput, true, ""));
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === "") {
            dispatchLoginFormState(
                updatedPasswordAction(
                    passwordInput,
                    false,
                    "Please enter a password"
                )
            );

            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchLoginFormState(
                updatedPasswordAction(
                    passwordInput,
                    false,
                    "You must enter a password with at least 8 characters which includes one capital letter, number and special character"
                )
            );
        }

        dispatchLoginFormState(updatedPasswordAction(passwordInput, true, ""));
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

        const loginFormValues = loginFormState.values;
        const data = {
            email: loginFormValues.email,
            password: loginFormValues.password,
        };

        try {
            const response = await fetch("http://localhost:3000/admins/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem("ADMIN", token);
            authContextValue.dispatchAssignAccessState(
                initialTokenAction(token)
            );
            authContextValue.dispatchAssignAccessState(
                initialUserTypeAction("ADMIN")
            );

            navigate("/admins/dashboard");
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

            <Link to="/admins/signup" className="signup-link">
                Don't have an account? Signup...
            </Link>

            <button type="submit">Login</button>
        </form>
    );
};

export default AdminLoginForm;
