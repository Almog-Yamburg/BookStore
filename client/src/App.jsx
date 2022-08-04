import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/shared/header/Header.component";
import Footer from "./components/shared/footer/Footer.component";
import HomePage from "./pages/home-page/HomePage.component";
import LoginPage from "./pages/login-page/LoginPage.component";
import SignupPage from "./pages/signup-page/SignupPage.component";
import PageNotFound from "./pages/page-not-found/PageNotFound.component";
import BookPage from "./pages/book-page/BookPage.component";
import CartPage from "./pages/cart-page/CartPage.component";
import AdminPage from "./pages/admin-page/AdminPage.component";
import AdminLoginPage from "./pages/admin-page/admin-login-page/AdminLoginPage.component";
import AdminSignupPage from "./pages/admin-page/admin-signup-page/AdminSignupPage.component";

import AuthContextProvider from "./contexts/Auth.context";
import CartContextProvider from "./contexts/Cart.context";
import BookContextProvider from "./contexts/Book.context";

const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <CartContextProvider>
                    <BookContextProvider>
                        <Header />

                        <Routes>
                            <Route path="/" element={<HomePage />} />

                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignupPage />} />

                            <Route
                                path="/books/:bookID"
                                element={<BookPage />}
                            />
                            <Route path="/cart" element={<CartPage />} />

                            <Route
                                path="/admins/login"
                                element={<AdminLoginPage />}
                            />

                            <Route
                                path="/admins/signup"
                                element={<AdminSignupPage />}
                            />

                            <Route
                                path="/admins/dashboard"
                                element={<AdminPage />}
                            />

                            <Route path="*" element={<PageNotFound />} />
                        </Routes>

                        <Footer />
                    </BookContextProvider>
                </CartContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;
