import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  tasks!: Task[];
  subscription = new Subscription();

  constructor(
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.todoFacade.getFilteredTasks$().subscribe(tasks => this.tasks = tasks)
    );
    this.todoFacade.loadTodoList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
