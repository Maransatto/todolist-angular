import { TodoItem } from "./todo-item.model";

export class TodoList {
    filter: string;
    status: number;
    items: TodoItem[];

    constructor(
        filter: string = '',
        status: number = TodoStatus.toBeDone,
        items: TodoItem[] = []
    ) {
        this.filter = filter;
        this.status = status;
        this.items = items
    }
}

export enum TodoStatus {
    toBeDone = 1,
    completed = 2,
    all = 3
}