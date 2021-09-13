import { createReducer, on, Action} from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { Task } from '../todo/models/task.model';

export interface State {
    tasks: Task[],
    newTaskId: number
}

export const initialState: State = {
    tasks: [],
    newTaskId: 0
}

export const tasksReducer = createReducer(
    initialState,
    on(TodoActions.setTasks, (state, { tasks }) => ({ ...state, tasks: [...tasks]})),
    on(TodoActions.addTask, (state, { description }) => {
        let newTaskId = 1;
        if (state.tasks.length) {
            newTaskId = state.tasks.reduce((acc, curr) => curr.id > acc.id ? curr : acc).id + 1;
        }
        return {
            ...state,
            tasks: [...state.tasks, new Task(newTaskId, description, false) ],
            newTaskId
        }
    }),
    on(TodoActions.deleteTask, (state, { taskId }) => {
        const deletingTaskId = taskId || state.newTaskId;
        return {
            ...state,
            tasks: state.tasks.filter(taskState => taskState.id !== deletingTaskId)
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
    on(TodoActions.storeTaskSuccess, state => state),
    on(TodoActions.startCompletingTask, state => state)
)

export function reducer(state: State | undefined, action: Action) {
    return tasksReducer(state, action);
}