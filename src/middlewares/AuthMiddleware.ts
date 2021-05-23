import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const inputedToken = req.headers.authorization;

    if (!inputedToken) {
        return res
            .status(401)
            .json({ success: false, message: "Token not provided" });
    }

    const secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token = inputedToken.split(" ")[1];

    try {
        const decoded: string | object = jwt.verify(token, secretKey);

        if (!decoded) {
            return res
                .status(401)
                .json({ success: false, message: "Token invalid" });
        }

        req.app.locals.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        // TODO: handle error related to jwt properly
        if (error.message === "jwt expired") {
            return res
                .status(401)
                .json({ success: false, message: "Token expired" });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
