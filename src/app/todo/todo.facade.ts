import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable } from "rxjs";
import { TodoService } from "./api/todo.service";
import { Task } from "./models/task.model";
import { TodoFilter, TodoStatus } from "./models/todo-filter";
import { TodoState } from "./states/todo.state";

@Injectable({
    providedIn: 'root'
})
export class TodoFacade {
    
    constructor(
        private todoState: TodoState,
        private todoService: TodoService,
        private toastr: ToastrService,
        private ngxService: NgxUiLoaderService
    ) { }

    getTodoFilter$(): Observable<TodoFilter> {
        return this.todoState.getTodoFilter$();
    }

    getTasks$(): Observable<Task[]> {
        return this.todoState.getTasks$();
    }

    getFilteredTasks$(): Observable<Task[]> {
        return this.todoState.getFilteredTasks$();
    }

    completeTask(task: Task, completed: boolean) {
        // being pessimistic
        this.todoService.completeTask(task)
            .then(() => {
                this.todoState.completeTask(task, completed);
            }).catch(err => {
                this.toastr.warning('There was an error on trying to complete. Please try again', 'Oops');
            })
    }
}