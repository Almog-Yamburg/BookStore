import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const createUser = async (req, res, next) => {
    const userData = req.body;

    const user = new User(userData);

    const cart = new Cart({ ownerID: user._id });

    try {
        await user.save();
        await cart.save();

        const token = await user.generateAuthToken();

        res.status(201).send(
            new SuccessResponse(
                201,
                "Created",
                "User account was created successfully!",
                { user, token }
            )
        );
    } catch (error) {
        error.status = 400;
        error.statusText = "Bad request";
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Unable to login");
        }

        const user = await User.findUserByEmailAndPassword(email, password);
        if (!user) throw new Error();

        const token = await user.generateAuthToken();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "User login successfully!", {
                user,
                token,
            })
        );
    } catch (error) {
        error.status = 400;
        error.statusText = "Bad request";
        next(error);
    }
};

export const logout = async (req, res, next) => {
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter(
            (tokenDoc) => tokenDoc.token !== token
        );
        await user.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "User logout successfully")
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};
