import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoList } from "../models/todo-list.model";

@Injectable({
    providedIn: 'root'
})
export class TodoState {
    private todoList$ = new BehaviorSubject<TodoList>(new TodoList());

    getTodoList$(): Observable<TodoList> {
        return this.todoList$.asObservable();
    }

    setTodoList(todoList: TodoList) {
        this.todoList$.next(todoList);
    }
}