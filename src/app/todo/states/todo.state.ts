import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoItem } from "../models/todo-item.model";
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

    addItems(newItems: TodoItem[]) {
        const currentList = this.todoList$.getValue();
        currentList.items = [...currentList.items, ...newItems];
        this.todoList$.next(currentList);
    }
}