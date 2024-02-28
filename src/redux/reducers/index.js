

// Importing combineReducers function from redux
import { combineReducers } from "redux";

// Importing todoReducer from './todoReducer'
import todoReducer from './todoReducer'

// Combining all reducers into a single rootReducer using combineReducers
// Each reducer will manage its own part of the Redux store state
const rootReducer = combineReducers({
    // Assigning the todoReducer to manage todo-related state
    todoReducer,
})

// Exporting the rootReducer
export default rootReducer;
