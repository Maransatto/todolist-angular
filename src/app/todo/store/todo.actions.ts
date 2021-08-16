import { createAction, props } from "@ngrx/store";
import { Task } from '../models/task.model';

export const setTasks = createAction('[Todo] Set Tasks', props<{ tasks: Task[] }>()); // changing state (reducer)
export const fetchTasks = createAction('[Todo] Fetch Tasks'); // via effects
export const addTask = createAction('[Todo] Add Task', props<{ task: Task }>()); // changing state (reducer)
export const storeTask = createAction('[Todo] Store Task', props<{ task: Task }>()); // via effects
export const deleteTask = createAction('[Todo] Delete Task', props<{ taskId: number }>()); // changing state (reducer) 
export const setFilter = createAction('[Todo] Set Filter'); // changing state (reducer)

// export const applyFilter = createAction('[Todo] Apply Filter'); // changing state (reducer) // might be not necessary
