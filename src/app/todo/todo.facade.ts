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

    getTasks$(): Observable<TodoItem[]> {
        return this.todoState.getTasks$();
    }

    loadTodoList() {
        this.todoState.setTodoList(new TodoList());
        this.todoService.getTodoList()
            .then(theList => {
                this.todoState.addItems(theList);
            })
    }

    addNewTask(description: string) {

        const newTask = new TodoItem(description, false);
        // been optimistic
        this.todoState.addItems([newTask]);
        this.todoService.postNewTask(newTask)
            .catch(err => {
                console.error('Error on adding new task api method');
                this.todoState.removeItem(newTask);
            })

    }

    filterByStatus(description: string, status: TodoStatus) {
        this.todoState.filter(description, status);
    }
}