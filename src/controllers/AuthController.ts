import { Request, Response } from "express";
import PasswordHash from "../utils/PasswordHash";
import db from "../db/models";

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body;

        try {
            const hashPassword = await PasswordHash.hash(password);

            await db.user.create({
                username,
                password: hashPassword,
            });

            return res.json({
                success: true,
                message: "Successfully create new user",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    login(req: Request, res: Response): Response {
        return res.send("Login");
    }
}

export default new AuthController();
