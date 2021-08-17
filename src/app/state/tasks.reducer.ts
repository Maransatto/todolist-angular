import { createReducer, on, Action} from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { Task } from '../todo/models/task.model';

export interface State {
    tasks: Task[]
}

export const initialState: State = {
    tasks: []
}

export const tasksReducer = createReducer(
    initialState,
    on(TodoActions.setTasks, (state, { tasks }) => ({ ...state, tasks: [...tasks]})),
    on(TodoActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
    on(TodoActions.deleteTask, (state, { task }) => {
        return {
            ...state,
            tasks: state.tasks.filter(taskState => taskState.id !== task.id)
        }
    }),
    on(TodoActions.completeTask, (state, { task, completed }) => {
        const updatedTask = {
            ...state.tasks.find(taskState => taskState.id === task.id),
            completed: completed
        };
        const index = state.tasks.findIndex(taskState => taskState.id === task.id);
        const updatedTasks = [...state.tasks ];
        updatedTasks[index] = <Task>updatedTask;
        return {
            ...state,
            tasks: updatedTasks
        };
    }),
    on(TodoActions.fetchTasks, state => state),
    on(TodoActions.startDeletingTask, state => state),
    on(TodoActions.storeTask, state => state),
    on(TodoActions.storeTaskSuccess, state => state)
)

export function reducer(state: State | undefined, action: Action) {
    return tasksReducer(state, action);
}