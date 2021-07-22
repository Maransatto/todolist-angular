import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoItem } from "../models/todo-item.model";
import { TodoList, TodoStatus } from "../models/todo-list.model";

@Injectable({
    providedIn: 'root'
})
export class TodoState {

    private todoList$ = new BehaviorSubject<TodoList>(new TodoList());
    private filteredTasks$ = new BehaviorSubject<TodoItem[]>([]);

    getTodoList$(): Observable<TodoList> {
        return this.todoList$.asObservable();
    }

    getTasks$(): Observable<TodoItem[]> {
        return this.filteredTasks$.asObservable();
    }

    setTodoList(todoList: TodoList) {
        this.todoList$.next(todoList);
    }

    addItems(newItems: TodoItem[]) {
        const currentList = this.todoList$.getValue();
        currentList.items = [...currentList.items, ...newItems];
        this.todoList$.next(currentList);
    }

    removeItem(itemToRemove: TodoItem) {
        const currentList = this.todoList$.getValue();
        currentList.items = currentList.items.filter(item => item.description !== itemToRemove.description);
        this.todoList$.next(currentList);
    }

    filter(description: string, status: TodoStatus) {
        const tasks = this.todoList$.getValue().items.filter(
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