import { createAction, props } from "@ngrx/store";
import { Task } from '../todo/models/task.model';
import { TodoFilter } from "../todo/models/todo-filter";

export const TODO_SET_TASKS = '[Todo] Set Tasks';
export const TODO_FETCH_TASKS = '[Todo] Fetch Tasks';
export const TODO_ADD_TASK = '[Todo] Add Task';
export const TODO_STORE_TASK = '[Todo] Store Task';
export const TODO_STORE_TASK_SUCCESS = '[Todo] Store Task';
export const TODO_START_DELETING_TASK = '[Todo] Start Deleting Task';
export const TODO_DELETE_TASK = '[Todo] Delete Task';
export const TODO_SET_FILTER = '[Todo] Set Filter';
export const TODO_COMPLETE_TASK = '[Todo] Complete Task'


export const setTasks = createAction(TODO_SET_TASKS, props<{ tasks: Task[] }>());
export const fetchTasks = createAction(TODO_FETCH_TASKS);
export const addTask = createAction(TODO_ADD_TASK, props<{ task: Task }>());
export const storeTask = createAction(TODO_STORE_TASK, props<{ task: Task }>());
export const storeTaskSuccess = createAction(TODO_STORE_TASK_SUCCESS)
export const startDeletingTask = createAction(TODO_START_DELETING_TASK, props<{ task: Task }>());
export const deleteTask = createAction(TODO_DELETE_TASK, props<{ task: Task }>());
export const setFilter = createAction(TODO_SET_FILTER, props<{ filter: TodoFilter }>());
export const completeTask = createAction(TODO_COMPLETE_TASK, props<{ task: Task, completed: boolean }>())