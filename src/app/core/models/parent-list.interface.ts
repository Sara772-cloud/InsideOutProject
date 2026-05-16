import { ChildrenList } from "./children-list.interface";

export interface ParentList {
    id: number;
    name: string;
    email: string;
    children: ChildrenList[];
}
