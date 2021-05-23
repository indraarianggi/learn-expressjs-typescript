import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
import db from "../db/models";

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body;

        try {
            const hashPassword = await Authentication.passwordHash(password);

            await db.user.create({
                username,
                password: hashPassword,
            });

            return res.json({
                success: true,
                message: "Registration success",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body;

        try {
            // find user data based on username
            const user = await db.user.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: `User with username '${username}' not found`,
                });
            }

            // password validation
            const isValidPassword = await Authentication.passwordCompare(
                password,
                user.password
            );

            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password",
                });
            }

            // generate token
            const token = Authentication.generateToken(user.id, user.username);

            return res.json({
                success: true,
                message: "Login success",
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    profile = async (req: Request, res: Response): Promise<Response> => {
        return res.json({
            success: true,
            message: "Success get profile data",
            data: req.app.locals.user,
        });
    };
}

export default new AuthController();
