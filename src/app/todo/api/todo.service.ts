import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class todoService {
    
    getTodoList(): Promise<Task[]> {
        return new Promise((resolve) => {
            // supposing this is a return of a rest api
            const theList = [
                new Task(1, 'Go to shopping', false),
                new Task(2, 'Buy a horse', false),
                new Task(3, 'Start this exam', true)
            ]
            setTimeout(() => {
                resolve(theList);
            }, 1000);
        })
    }

    postNewTask(task: Task): Promise<any> {
        // we could simulate an error from the REST API here
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

    removeTask(task: Task): Promise<any> {
        // we could simulate an error from the REST API here
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

    completeTask(task: Task): Promise<any> {
        // we could simulate an error from the REST API here
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