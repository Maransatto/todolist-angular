import { Injectable } from "@angular/core";
import { TodoItem } from "../models/todo-item.model";

@Injectable({
    providedIn: 'root'
})
export class todoService {
    
    getTodoList(): Promise<TodoItem[]> {
        return new Promise((resolve) => {
            // supposing this is a return of a rest api
            const theList = [
                new TodoItem(1, 'Go to shopping', false),
                new TodoItem(2, 'Buy a horse', false),
                new TodoItem(3, 'Start this exam', true)
            ]
            setTimeout(() => {
                resolve(theList);
            }, 1000);
        })
    }

    postNewTask(item: TodoItem): Promise<any> {
        return new Promise((resolve, reject) => {
            const itWorked = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            setTimeout(() => {
                if (itWorked) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }, 500);

        })
    }

}