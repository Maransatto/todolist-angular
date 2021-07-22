import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/todo/models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item!: TodoItem;

  constructor() { }

  ngOnInit(): void {
  }

}
