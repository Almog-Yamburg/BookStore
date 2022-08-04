import express from "express";
import * as cartController from "../controllers/cart.controller.js";

import userAuth from "../middlewares/user.auth.js";

const router = new express.Router();

router.get("/cart", userAuth, cartController.getCart);

router.post("/cart/add-to-cart", userAuth, cartController.addBookToCart);

router.patch("/cart/update", userAuth, cartController.updateQuantity);

router.delete(
    "/cart/remove-from-cart",
    userAuth,
    cartController.removeFromCart
);

router.post("/cart/checkout", userAuth, cartController.checkout);

export default router;
