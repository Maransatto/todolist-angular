import { TodoItem } from "./todo-item.model";

export class TodoList {
    filter: string;
    status: string;
    items: TodoItem[];

    constructor(
        filter: string = '',
        status: string = TodoStatus.toBeDone,
        items: TodoItem[] = []
    ) {
        this.filter = filter;
        this.status = status;
        this.items = items
    }
}

export enum TodoStatus {
    toBeDone = '1',
    completed = '2',
    all = '3'
}