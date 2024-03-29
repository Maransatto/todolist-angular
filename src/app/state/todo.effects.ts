import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { EMPTY, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
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
        switchMap(actions => this.todoService.postNewTask(actions.description, false)
            .pipe(
                map(() => {
                    this.toastr.success(`New Task Added: ${actions.description}`, 'Success');
                    // I would actually get the new Id here and send it to the action storeTaskSuccess()
                    // instead of generating a new Id on the addTask reducer.
                    return TodoActions.storeTaskSuccess();
                }),
                catchError(() => {
                    this.toastr.warning('There was an error on trying to add a new task. Please try again', 'Oops');
                    return of(TodoActions.deleteTask({ taskId: 0 })); // rolling back (as it is optimistic)
                    // the question here is: 
                    //    What should be the best approach here assuming that the new Task id from the action is 0 (zero)?
                    //    should I store a new property called newTaskId on the state?
                    //      That's what I did for now
                })
            ))
    ));

    // pessimistic (once startDeletingTask DOES NOT affect the state)
    deleteTaskApi$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.startDeletingTask),
        tap(() => this.ngxService.start()),
        switchMap(actions => this.todoService.removeTask(actions.task)
            .pipe(
                map(() => {
                    this.toastr.success(`Task Removed: ${actions.task.description}`, 'Success');
                    this.ngxService.stop();
                    return TodoActions.deleteTask({ taskId: actions.task.id }); // persists (as it is pessimistic)
                }),
                catchError(() => {
                    this.toastr.warning('There was an error on trying to remove. Please try again', 'Oops');
                    this.ngxService.stop();
                    return EMPTY;
                })
            ))
    ));

    //pessimisteic
    completeTask$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.startCompletingTask),
        tap(() => this.ngxService.start()),
        switchMap(actions => this.todoService.completeTask(actions.task)
            .pipe(
                map(() => {
                    this.ngxService.stop();
                    return TodoActions.completeTask(actions)
                }),
                catchError(() => {
                    this.toastr.warning('There was an error on trying to complete. Please try again', 'Oops');
                    this.ngxService.stop();
                    return EMPTY;
                })
            ))
    ))

    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private toastr: ToastrService,
        private ngxService: NgxUiLoaderService

    ) { }
}