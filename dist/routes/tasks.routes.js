import { Router } from "express";
import * as taskControler from "../controllers/task.controller.js";
export const taskRouter = Router();
taskRouter.get("/", taskControler.getAllTasks);
taskRouter.get("/:id", taskControler.getTaskById);
taskRouter.post("/", taskControler.createTask);
taskRouter.patch("/:id", taskControler.updateTask);
taskRouter.delete("/:id", taskControler.deleteTask);
//# sourceMappingURL=tasks.routes.js.map