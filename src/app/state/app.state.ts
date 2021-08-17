import * as fromTaskReducer from '../state/tasks.reducer';
import * as fromFilterReducer from '../state/filter.reducer';
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    tasks: fromTaskReducer.State,
    filter: fromFilterReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    tasks: fromTaskReducer.tasksReducer,
    filter: fromFilterReducer.filterReducer
}