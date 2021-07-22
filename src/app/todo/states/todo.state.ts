import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoItem } from "../models/todo-item.model";
import { TodoFilter, TodoStatus } from "../models/todo-list.model";

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

    addItems(newItems: TodoItem[]) {
        const currentTasks = [...this.tasks$.getValue(), ...newItems];
        this.tasks$.next(currentTasks);
        this.filter();
    }

    removeItem(itemToRemove: TodoItem) {
        let currentTasks = this.tasks$.getValue();
        currentTasks = currentTasks.filter(item => item.description !== itemToRemove.description);
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