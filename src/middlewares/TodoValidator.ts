import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
    check("description").isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ success: false, errors: errors.array() });
        }

        next();
    },
];

export default validate;
