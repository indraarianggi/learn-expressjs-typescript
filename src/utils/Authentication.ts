import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    };

    public static passwordCompare = async (
        inputedPassword: string,
        encryptedPassword: string
    ): Promise<boolean> => {
        try {
            const result = await bcrypt.compare(
                inputedPassword,
                encryptedPassword
            );

            return result;
        } catch (error) {
            throw error;
        }
    };

    public static generateToken = (id: number, username: string): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "secret";

        const token = jwt.sign({ id, username }, secretKey, {
            expiresIn: "1d",
        });

        return token;
    };
}

export default Authentication;
