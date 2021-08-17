import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../models/task.model';
// import { TodoFacade } from '../../todo.facade';

import * as fromApp from 'src/app/state/app.state';
import * as TodoActions from '../../../state/todo.actions';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks$: Observable<Task[]> = this.store.select('tasks').pipe(map(tasksState => tasksState.tasks));
  // subscription = new Subscription();

  constructor(
    // private todoFacade: TodoFacade,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(TodoActions.fetchTasks());
    // this.subscription.add(
    //   this.todoFacade.getFilteredTasks$().subscribe(tasks => this.tasks = tasks)
    // );
    // this.todoFacade.loadTodoList();
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

}
