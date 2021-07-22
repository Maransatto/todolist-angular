import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { todoService } from "./api/todo.service";
import { TodoItem } from "./models/todo-item.model";
import { TodoFilter, TodoStatus } from "./models/todo-list.model";
import { TodoState } from "./states/todo.state";

@Injectable({
    providedIn: 'root'
})
export class TodoFacade {
    
    constructor(
        private todoState: TodoState,
        private todoService: todoService
    ) { }

    getTodoFilter$(): Observable<TodoFilter> {
        return this.todoState.getTodoFilter$();
    }

    getTasks$(): Observable<TodoItem[]> {
        return this.todoState.getTasks$();
    }

    getFilteredTasks$(): Observable<TodoItem[]> {
        return this.todoState.getFilteredTasks$();
    }

    loadTodoList() {
        this.todoState.setTodoFilter(new TodoFilter());
        this.todoService.getTodoList()
            .then(theList => {
                this.todoState.addItems(theList);
                this.applyFilter();
            });
    }

    addNewTask(description: string) {

        const newTask = new TodoItem(description, false);
        // been optimistic
        this.todoState.addItems([newTask]);
        this.todoService.postNewTask(newTask)
            .then(() => {
                this.applyFilter();
            })
            .catch(err => {
                console.error('Error on adding new task via api method');
                this.todoState.removeItem(newTask);
            });
    }

    changeFilter(description: string, status: TodoStatus) {
        this.todoState.setTodoFilter(new TodoFilter(description, status));
        this.applyFilter();
    }

    applyFilter() {
        this.todoState.filter();
    }
}