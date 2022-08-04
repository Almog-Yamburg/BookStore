import express from "express";
import * as bookController from "../controllers/book.controller.js";

import adminAuth from "../middlewares/admin.auth.js";

const router = new express.Router();

router.get("/books", bookController.getBooks);

router.get("/books/:id", bookController.getBook);

router.post("/books/new", adminAuth, bookController.createBook);

router.patch("/books/:id", adminAuth, bookController.updateBook);

router.delete("/books/:id", adminAuth, bookController.deleteBook);

export default router;
