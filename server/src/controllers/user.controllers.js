import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";

export const createUser = async (req, res) => {
    const userData = req.body;

    const user = new User(userData);

    const cart = new Cart({ ownerID: user._id });

    try {
        await user.save();
        await cart.save();

        const token = await user.generateAuthToken();

        res.status(201).send({
            status: 201,
            statusText: "Created",
            data: { user: user, token: token },
            message: "User account was created successfully!",
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: "",
        });
    }
};

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            throw new Error();
        }

        const user = await User.findUserByEmailAndPassword(email, password);

        const token = await user.generateAuthToken();

        res.send({
            status: 200,
            statusText: "Ok",
            data: {
                user: user,
                token: token,
            },
            message: "User login successfully!",
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: "",
        });
    }
};

export const logout = async (req, res) => {
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter(
            (tokenDoc) => tokenDoc.token !== token
        );
        await user.save();

        res.status(200).send({
            status: 200,
            statusText: "Ok",
            data: {},
            message: "User logout successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};
