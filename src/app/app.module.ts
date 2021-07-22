import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo/components/todo-input/todo-input.component';
import { TodoFilterComponent } from './todo/components/todo-filter/todo-filter.component';
import { TodoListComponent } from './todo/components/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo/components/todo-list/todo-item/todo-item.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
