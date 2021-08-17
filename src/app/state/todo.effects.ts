import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { TodoService } from "../todo/api/todo.service";

import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {

    fetchTasks$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.TODO_FETCH_TASKS),
        switchMap(() =>  this.todoService.getTasks()
            .pipe(
                map(tasks => {
                    return { tasks: tasks }
                }),
                map(tasks => {
                    return TodoActions.setTasks(tasks);
                }),
                catchError(() => EMPTY)
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) { }
}