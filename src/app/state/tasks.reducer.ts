import { createReducer, on} from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { Task } from '../todo/models/task.model';

export interface State {
    tasks: Task[]
}

export const initialState: State = {
    tasks: [
        new Task(1, 'Understand NgRx core concepts', true),
        new Task(2, 'Refactor this entire app', false),
        new Task(3, 'Send it to Michal', false),
    ]
}

export const tasksReducer = createReducer(
    initialState,
    on(TodoActions.setTasks, (state, { tasks }) => ({ ...state, tasks: [...tasks]})),
    on(TodoActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
    on(TodoActions.deleteTask, (state, { taskId }) => {
        return {
            ...state,
            tasks: state.tasks.filter(task => task.id !== taskId)
        }
    }),
    on(TodoActions.fetchTasks, state => state),
    on(TodoActions.storeTask, state => state)
)