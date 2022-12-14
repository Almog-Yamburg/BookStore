import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./signup-page.styles.css";

import { AuthContext } from "../../contexts/Auth.context";

import Card from "../../components/card/Card.component";
import Loader from "../../components/shared/loader/Loader.component";
import SignupForm from "./signup-form/SignupForm.component";

const SignupPage = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authContextValue.setUserType === "ADMIN") {
            navigate("*");
        }

        if (authContextValue.setUserToken === "USER") {
            navigate("/");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="signup-page">
            <Card className="signup-page-card">
                <h1>Hello New User!</h1>

                <SignupForm />
            </Card>
        </main>
    );
};

export default SignupPage;
