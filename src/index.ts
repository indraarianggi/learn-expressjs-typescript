import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";
import db from "./db/models";

// Routers
import AuthRoutes from "./routers/AuthRoutes";
import UserRoutes from "./routers/UserRoutes";
import TodoRoutes from "./routers/TodoRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.database();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected database(): void {
        db.sequelize.sync();
    }

    protected routes(): void {
        this.app
            .route("/")
            .get((req: Request, res: Response) =>
                res.send("Route using typescript")
            );

        this.app.use("/api/v1/users", UserRoutes);
        this.app.use("/api/v1/auth", AuthRoutes);
        this.app.use("/api/v1/todos", TodoRoutes);
    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => console.log(`App running on port ${port}`));
