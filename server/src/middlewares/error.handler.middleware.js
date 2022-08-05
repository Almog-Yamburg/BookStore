import { ErrorResponse } from "../models/response.model.js";

const errorHandler = (err, req, res, next) => {
    const { status, statusText, message } = err;

    res.status(err.status).send(new ErrorResponse(status, statusText, message));
};

export default errorHandler;
