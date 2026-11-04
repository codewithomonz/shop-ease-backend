import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task.ts";
export declare function getAllTasks(): Promise<Task[]>;
export declare function getTaskById(id: string): Promise<Task>;
export declare function createTask(input: CreateTaskInput): Promise<Task>;
export declare function updateTask(id: string, input: UpdateTaskInput): Promise<Task>;
export declare function deleteTask(id: string): Promise<void>;
//# sourceMappingURL=task.service.d.ts.map