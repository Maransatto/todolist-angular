import { TodoItem } from "./todo-item.model";

export class TodoList {
    filter: string;
    status: number;
    todoList: TodoItem[] = [];

    constructor(filter: string, status: number) {
        this.filter = filter;
        this.status = status;
    }
}