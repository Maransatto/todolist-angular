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

    loadTodoList() {
        this.todoState.setTodoFilter(new TodoFilter());
        this.ngxService.start();
        // this.todoService.getTasks()
        //     .then(theList => {
        //         this.todoState.addTasks(theList);
        //     }).finally(() => {
        //         this.ngxService.stop();
        //     });
    }

    addNewTask(description: string) {

        const newTask = new Task(0, description, false);
        // being optimistic
        this.todoState.addSingleTask(newTask);
        this.todoService.postNewTask(newTask)
            .then(() => {
                this.toastr.success(`New Task Added: ${description}`, 'Success');
            })
            .catch(err => {
                this.toastr.warning('There was an error on trying to add a new task. Please try again', 'Oops');
                this.todoState.removeTask(newTask);
            });
    }

    removeTask(task: Task) {
        
        // being pessimistic
        this.ngxService.start();
        this.todoService.removeTask(task)
            .then(() => {
                this.todoState.removeTask(task);
                this.toastr.success(`Task Removed: ${task.description}`, 'Success');
            }).catch(err => {
                this.toastr.warning('There was an error on trying to remove. Please try again', 'Oops');
            }).finally(() => {
                this.ngxService.stop();
            })
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

    changeFilter(description: string, status: TodoStatus) {
        this.todoState.setTodoFilter(new TodoFilter(description, status));
        this.applyFilter();
    }

    applyFilter() {
        this.todoState.filter();
    }
}