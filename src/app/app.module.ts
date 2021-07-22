import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo/components/todo-input/todo-input.component';
import { TodoFilterComponent } from './todo/components/todo-filter/todo-filter.component';
import { TodoListComponent } from './todo/components/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo/components/todo-list/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoFilterComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
