import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoItem } from "../models/todo-item.model";
import { TodoFilter, TodoStatus } from "../models/todo-filter";

@Injectable({
    providedIn: 'root'
})
export class TodoState {

    private filter$ = new BehaviorSubject<TodoFilter>(new TodoFilter());
    private tasks$ = new BehaviorSubject<TodoItem[]>([]);
    private filteredTasks$ = new BehaviorSubject<TodoItem[]>([]);

    getTodoFilter$(): Observable<TodoFilter> {
        return this.filter$.asObservable();
    }

    getTasks$(): Observable<TodoItem[]> {
        return this.tasks$.asObservable();
    }

    getFilteredTasks$(): Observable<TodoItem[]> {
        return this.filteredTasks$.asObservable();
    }

    setTodoFilter(filter: TodoFilter) {
        this.filter$.next(filter);
    }

    addTasks(newTasks: TodoItem[]) {
        this.tasks$.next([...this.tasks$.getValue(), ...newTasks]);
        this.filter();
    }

    addSingleTask(newTask: TodoItem) {
        const tasks = this.tasks$.getValue();
        newTask.id = tasks.length + 1;
        tasks.push(newTask);
        this.tasks$.next(tasks);
        this.filter();
    }

    removeTask(taskToRemove: TodoItem) {
        let currentTasks = this.tasks$.getValue();
        currentTasks = currentTasks.filter(item => item.id !== taskToRemove.id);
        this.tasks$.next(currentTasks);
        this.filter();
    }

    completeTask(task: TodoItem, completed: boolean) {
        const currentTasks = this.tasks$.getValue();
        const index = currentTasks.findIndex(item => item.id === task.id);
        task.completed = completed;
        currentTasks[index] = task;
        this.tasks$.next(currentTasks);
        this.filter();
    }

    filter() {
        const { description, status } = this.filter$.getValue();
        
        const tasks = this.tasks$.getValue().filter(
            item => {
                return ((status === TodoStatus.all) ||
                       (item.completed  && status === TodoStatus.completed) ||
                       (!item.completed && status === TodoStatus.toBeDone)) &&

                       (item.description.toLowerCase().includes(description?.toLowerCase()) || !description) // I could also create a custom Pipe for this
            }
        )
        this.filteredTasks$.next(tasks);
    }
}