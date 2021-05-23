import { Request, Response } from "express";
import IController from "./ControllerInterface";
import db from "../db/models";

class TodoController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.app.locals.user;

            const todos = await db.todo.findAll({
                where: { user_id: id },
                attributes: ["id", "description"],
            });

            return res.json({
                success: true,
                message: "Success get todos",
                data: todos,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    create = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.app.locals.user;
        const { description } = req.body;

        try {
            const newTodo = await db.todo.create({
                user_id: id,
                description,
            });

            return res.json({
                success: true,
                message: "Success create new todo",
                data: newTodo,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    show = async (req: Request, res: Response): Promise<Response> => {
        const { id: user_id } = req.app.locals.user;
        const { id } = req.params;

        try {
            const todo = await db.todo.findOne({
                where: { id, user_id },
                attributes: ["id", "description"],
            });

            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: "Todo not found",
                });
            }

            return res.json({
                success: true,
                message: "Success get todo",
                data: todo,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id: user_id } = req.app.locals.user;
        const { id } = req.params;
        const { description } = req.body;

        try {
            await db.todo.update(
                {
                    description,
                },
                {
                    where: { id, user_id },
                }
            );

            return res.json({
                success: true,
                message: "Success update todo",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id: user_id } = req.app.locals.user;
        const { id } = req.params;

        try {
            await db.todo.destroy({
                where: { id, user_id },
            });

            return res.json({
                success: true,
                message: "Success delete todo",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
}

export default new TodoController();
