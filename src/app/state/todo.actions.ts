import { createAction, props } from "@ngrx/store";
import { Task } from '../todo/models/task.model';
import { TodoFilter } from "../todo/models/todo-filter";

export const TODO_SET_TASKS = '[Todo] Set Tasks';
export const TODO_FETCH_TASKS = '[Todo] Fetch Tasks';
export const TODO_ADD_TASK = '[Todo] Add Task';
export const TODO_STORE_TASK = '[Todo] Store Task';
export const TODO_DELETE_TASK = '[Todo] Delete Task';
export const TODO_SET_FILTER = '[Todo] Set Filter';


export const setTasks = createAction(TODO_SET_TASKS, props<{ tasks: Task[] }>()); // changing state (reducer)
export const fetchTasks = createAction(TODO_FETCH_TASKS); // via effects
export const addTask = createAction(TODO_ADD_TASK, props<{ task: Task }>()); // changing state (reducer)
export const storeTask = createAction(TODO_STORE_TASK, props<{ task: Task }>()); // via effects
export const deleteTask = createAction(TODO_DELETE_TASK, props<{ taskId: number }>()); // changing state (reducer) 
export const setFilter = createAction(TODO_SET_FILTER, props<{ filter: TodoFilter }>()); // changing state (reducer)

// export const applyFilter = createAction('[Todo] Apply Filter'); // changing state (reducer) // might be not necessary
