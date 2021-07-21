import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { todoService } from "./api/todo.service";
import { TodoItem } from "./models/todo-item.model";
import { TodoList, TodoStatus } from "./models/todo-list.model";
import { TodoState } from "./states/todo.state";

@Injectable({
    providedIn: 'root'
})
export class TodoFacade {
    
    constructor(
        private todoState: TodoState,
        private todoService: todoService
    ) { }

    getTodoList$(): Observable<TodoList> {
        return this.todoState.getTodoList$();
    }

    loadTodoList() {
        this.todoState.setTodoList(new TodoList());
        this.todoService.getTodoList()
            .then(theList => {
                this.todoState.addItems(theList);
            })
    }
}