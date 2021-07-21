import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TodoItem } from "./models/todo-item.model";
import { TodoList, TodoStatus } from "./models/todo-list.model";
import { TodoState } from "./states/todo.state";

@Injectable({
    providedIn: 'root'
})
export class TodoFacade {
    
    constructor(
        private todoState: TodoState
    ) { }

    getTodoList$(): Observable<TodoList> {
        return this.todoState.getTodoList$();
    }

    setDefaultData() {
        const defaultList = new TodoList(
            '',
            TodoStatus.toBeDone,
            [
                new TodoItem('Go to shopping', false),
                new TodoItem('Buy a horse', false),
                new TodoItem('Start this exam', true)
            ]
        )
        this.todoState.setTodoList(defaultList);
    }
}