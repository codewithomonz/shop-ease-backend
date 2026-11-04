import type { Task } from "./../types/task.ts";
type AdminTaskListFilters = {
    search: string;
    status: string;
};
export declare function findAllTasks(filters: AdminTaskListFilters): Promise<Task[]>;
export declare function updateTaskStatus(taskId: string, status: string): Promise<Task | null>;
export {};
//# sourceMappingURL=admin.task.repository.d.ts.map