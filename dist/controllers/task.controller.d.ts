import type { Request, Response } from "express";
type TaskParams = {
    id: string;
};
export declare function getAllTasks(_req: Request, res: Response): Promise<void>;
export declare function createTask(req: Request, res: Response): Promise<void>;
export declare function getTaskById(req: Request<TaskParams>, res: Response): Promise<void>;
export declare function updateTask(req: Request<TaskParams>, res: Response): Promise<void>;
export declare function deleteTask(req: Request<TaskParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=task.controller.d.ts.map