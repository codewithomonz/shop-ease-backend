// src/services/task.service.ts
import { randomUUID } from "node:crypto";
import { AppError } from "../errors/AppError.js";
// Temporary in-memory storage — replaced by a database in the Database section
const tasks = [];
export async function getAllTasks() {
    return tasks;
}
export async function getTaskById(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        throw new AppError(404, "Task not found");
    }
    return task;
}
export async function createTask(input) {
    const task = {
        id: randomUUID(),
        title: input.title,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
}
export async function updateTask(id, input) {
    const task = await getTaskById(id); // throws 404 if not found
    // Business rule: a completed task can't be renamed
    if (task.completed && input.title !== undefined) {
        throw new AppError(409, "Completed tasks cannot be renamed");
    }
    if (input.title !== undefined)
        task.title = input.title;
    if (input.completed !== undefined)
        task.completed = input.completed;
    return task;
}
export async function deleteTask(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
        throw new AppError(404, "Task not found");
    }
    tasks.splice(index, 1);
}
//# sourceMappingURL=task.service.js.map