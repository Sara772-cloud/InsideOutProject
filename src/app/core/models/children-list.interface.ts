import { TasksList } from "./tasks-list.interface";

export interface ChildrenList {
    id: number;
    name: string;
    age: number;
    description: string;
    tasks: TasksList[];

}
