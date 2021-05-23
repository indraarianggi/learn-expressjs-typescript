import { Request, Response } from "express";

interface IController {
    // Get all data
    index(req: Request, res: Response): Response | Promise<Response>;

    // Create a data (datum)
    create(req: Request, res: Response): Response | Promise<Response>;

    // Show a data (datum)
    show(req: Request, res: Response): Response | Promise<Response>;

    // Update a data (datum)
    update(req: Request, res: Response): Response | Promise<Response>;

    // Delete a data (datum)
    delete(req: Request, res: Response): Response | Promise<Response>;
}

export default IController;
