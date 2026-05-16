export interface AssignTask {
    title: string;
    description: string;
    taskType: string;
    predefinedTaskId: number | null;
    dueDate: string;
    specialistId: number;
    childId: number;
}