import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-login-page.styles.css";

import { AuthContext } from "../../../contexts/Auth.context";
import { LOADER_TIMEOUT } from "../../../constants/constants";

import Card from "../../../components/card/Card.component";
import Loader from "../../../components/shared/loader/Loader.component";
import AdminLoginForm from "../admin-login-page/admin-login-form/AdminLoginForm.component";

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authContextValue.assignAccessState.userType === "USER") {
            navigate("/");
        }

        if (authContextValue.assignAccessState.userType === "ADMIN") {
            navigate("/admin/dashboard");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="login-page">
            <Card className="login-page-card">
                <h1>Welcome Back Admin!</h1>

                <AdminLoginForm />
            </Card>
        </main>
    );
};

export default AdminLoginPage;
