import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { timeout } from "rxjs/operators";
import { Task } from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    
    getTasks(): Observable<Task[]> {
        return of([
            new Task(1, 'Understand NgRx core concepts', true),
            new Task(2, 'Refactor the TODO Feature to use NgRx', true),
            new Task(3, 'Refactor the Auth Feature to use NgRx and other best practices', false),
            new Task(4, 'Send it to Michal', true),
            new Task(5, 'Michal: Hire Maransatto, he deserves it!', false),
        ]).pipe(
            timeout(1000)
        );
    }

    postNewTask(description: string, completed: false): Observable<boolean> {
        return new Observable(subscriber => {
            // we could simulate an error from the REST API here
            const itWorked = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            setTimeout(() => {
                if (itWorked) {
                    subscriber.next(true);
                } else {
                    subscriber.error(false);
                }
            }, 1000);
        });
    }

    removeTask(task: Task): Observable<boolean> {
        return new Observable(subscriber => {
            // we could simulate an error from the REST API here
            const itWorked = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            setTimeout(() => {
                if (itWorked) {
                    subscriber.next(true);
                } else {
                    subscriber.error(false);
                }
            }, 1000);
        });
    }

    completeTask(task: Task): Observable<boolean> {
        return new Observable(subscriber => {
            // we could simulate an error from the REST API here
            const itWorked = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            setTimeout(() => {
                if (itWorked) {
                    subscriber.next(true);
                } else {
                    subscriber.error(false);
                }
            }, 500);
        });
    }

}