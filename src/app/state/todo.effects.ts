import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { EMPTY, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { TodoService } from "../todo/api/todo.service";

import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {

    fetchTasks$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.fetchTasks),
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

    // optimistic (once addTask DOES affects the state)
    storeTask$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.addTask),
        switchMap(actions => this.todoService.postNewTask(actions.task)
            .pipe(
                map(() => {
                    this.toastr.success(`New Task Added: ${actions.task.description}`, 'Success');
                    return TodoActions.storeTaskSuccess();
                }),
                catchError(() => {
                    this.toastr.warning('There was an error on trying to add a new task. Please try again', 'Oops');
                    return of(TodoActions.deleteTask({ task: actions.task })); // rolling back (as it is optimistic)
                })
            ))
    ));

    // pessimistic (once startDeletingTask DOES NOT affect the state)
    deleteTaskApi$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.startDeletingTask),
        switchMap(actions => this.todoService.removeTask(actions.task)
            .pipe(
                map(() => {
                    this.toastr.success(`Task Removed: ${actions.task.description}`, 'Success');
                    return TodoActions.deleteTask({ task: actions.task }); // persists (as it is pessimistic)
                }),
                catchError(() => {
                    this.toastr.warning('There was an error on trying to remove. Please try again', 'Oops');
                    return EMPTY;
                })
            ))
    ))

    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private toastr: ToastrService
    ) { }
}