import * as taskService from "../services/task.service.js";
export async function getAllTasks(_req, res) {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({ success: true, data: tasks });
}
export async function createTask(req, res) {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
}
export async function getTaskById(req, res) {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
}
export async function updateTask(req, res) {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json({ success: true, data: task });
}
export async function deleteTask(req, res) {
    await taskService.deleteTask(req.params.id);
    res.status(204).send(); // 204 = success, no content
}
//# sourceMappingURL=task.controller.js.map