import Admin from "../models/admin.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const createAdmin = async (req, res) => {
    const adminData = req.body;

    const admin = new Admin(adminData);

    try {
        await admin.save();

        const token = await admin.generateAuthToken();

        res.status(201).send(
            new SuccessResponse(
                201,
                "Created",
                "Admin account was created successfully!",
                { admin, token }
            )
        );
    } catch (error) {
        error.status = 400;
        error.statusText = "Bad request";
        next(error);
    }
};

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) throw new Error();

        const admin = await Admin.findAdminByEmailAndPassword(email, password);

        const token = await admin.generateAuthToken();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "Admin login successfully!", {
                admin,
                token,
            })
        );
    } catch (error) {
        error.status = 400;
        error.statusText = "Bad request";
        next(error);
    }
};

export const logout = async (req, res) => {
    const admin = req.admin;
    const token = req.token;

    try {
        admin.tokens = admin.tokens.filter(
            (tokenDoc) => tokenDoc.token !== token
        );
        await admin.save();

        res.status(200).send(
            new SuccessResponse(200, "Ok", "Admin logout successfully")
        );
    } catch (error) {
        error.status = 500;
        error.statusText = "Internal Server Error";
        next(error);
    }
};
