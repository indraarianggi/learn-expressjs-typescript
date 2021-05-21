import { Router } from "express";
import IRouter from "./RouteInterface";

// Controllers
import UserController from "../controllers/UserController";

class UserRoutes implements IRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/", UserController.index);
        this.router.post("/", UserController.create);
    }
}

export default new UserRoutes().router;
