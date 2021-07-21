import { Injectable } from "@angular/core";
import { TodoItem } from "../models/todo-item.model";

@Injectable({
    providedIn: 'root'
})
export class todoService {
    
    getTodoList(): Promise<TodoItem[]> {
        return new Promise((resolve, reject) => {
            // supposing this is a return of a rest api
            const theList = [
                new TodoItem('Go to shopping', false),
                new TodoItem('Buy a horse', false),
                new TodoItem('Start this exam', true)
            ]
            setTimeout(() => {
                resolve(theList);
            }, 2000);
        })
    }

}