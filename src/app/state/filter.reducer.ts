import { createReducer, on} from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { TodoFilter, TodoStatus } from '../todo/models/todo-filter';

export interface State {
    filter: TodoFilter
}

export const initialState: State = {
    filter: new TodoFilter('', TodoStatus.toBeDone)
};

export const filterReducer = createReducer(
    initialState,
    on(TodoActions.setFilter, (state, { filter }) => ({ filter }))
)