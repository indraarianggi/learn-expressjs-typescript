import { Request, Response, NextFunction } from "express";

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    let auth = true;

    if (!auth) {
        return res
            .status(401)
            .json({ success: false, message: "Not authenticated" });
    }

    next();
};
