import { createSelector } from '@ngrx/store';
import { Task } from '../todo/models/task.model';
import { TodoFilter, TodoStatus } from '../todo/models/todo-filter';
import * as fromApp from './app.state';

export const selectTasks = (state: fromApp.AppState) => state.tasks;
export const filter = (state: fromApp.AppState) => state.filter;

export const selectFilteredTasks = createSelector(
    selectTasks,
    filter,
    (tasksState: { tasks: Task[]}, filterState: { filter: TodoFilter}) => {
        return tasksState.tasks.filter(task => {
            const filter = filterState.filter;
            return (
                        (filter.status === TodoStatus.all) ||
                        (task.completed  && filter.status === TodoStatus.completed) ||
                        (!task.completed && filter.status === TodoStatus.toBeDone)
                   ) &&
                   (task.description.toLowerCase().includes(filter.description?.toLowerCase()) || !filter.description) 
        })
    }
);

export const selectTaskIncrementId = createSelector(selectTasks, (taskState: { tasks: Task[] }) => taskState.tasks.length + 1);