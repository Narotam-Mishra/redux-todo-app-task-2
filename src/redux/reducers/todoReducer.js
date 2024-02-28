
import {
    ADD_TODO,
    DELETE_TODO,
    CLEAR_ALL_TODO,
    EDIT_TODO,
    UPDATE_TODO,
    MARK_COMPLETED,
  } from "../actions/actionTypes";
  
  const initialState = {
    todos: [
      {
        id: 1,
        title: "TodoList 1",
        description: "This is first todo",
        isCompleted: true,
        isPending: false,
      },
      {
        id: 2,
        title: "TodoList 2",
        description: "This is second todo",
        isCompleted: false,
        isPending: true,
      },
      {
        id: 3,
        title: "TodoList 3",
        description: "This is third todo",
        isCompleted: false,
        isPending: true,
      },
    ],
    isEdit: false,
    editTodoId: "",
  };
  
  const todoReducer = (state = initialState, action) => {
    let id,
      title,
      description,
      newTodoList,
      editTodo,
      todoId,
      todoTitle,
      todoDescription,
      newEditTodo,
      todos,
      todo,
      selectedTodoId,
      allTodos;

    switch (action.type) {
      case ADD_TODO:
        ({ id, title, description } = action.payload);
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: id,
              title: title,
              description: description,
              isCompleted: false,
              isPending: true,
            },
          ],
          isEdit: action.isEdit,
        };
      case DELETE_TODO:
        newTodoList = state.todos.filter((item) => item.id != action.id);
        return {
          ...state,
          todos: newTodoList,
        };
  
      case EDIT_TODO:
        editTodo = action.payload;
        newEditTodo = state?.todos?.find((item) => item?.id === editTodo?.id);
        return {
          ...state,
          isEdit: action.isEdit,
          editTodo: newEditTodo,
        };
  
      case UPDATE_TODO:
        ({ todoId, todoTitle, todoDescription } = action.payload);
        todos = state.todos.filter((todo) => {
          return todo.id !== todoId;
        });
  
        todo = state.todos.find((todo) => todo?.id === todoId);
        todo.title = todoTitle;
        todo.description = todoDescription;
        // todo.isCompleted = todo?.isCompleted;
        // todo.isPending = todo?.isPending;
        todos.push(todo);
  
        return {
          ...state,
          todos: [...todos],
          isEdit: false,
        };
  
      case MARK_COMPLETED:
        ({ selectedTodoId } = action.payload);
        allTodos = [];
  
        selectedTodoId.forEach((id) => {
          allTodos = state.todos.filter((todo) => {
            return todo.id !== id;
          });
  
          const selectedTodo = state.todos.find((todo) => todo?.id === id);
        //   selectedTodo.title = selectedTodo?.title;
        //   selectedTodo.description = selectedTodo?.description;
          selectedTodo.isCompleted = true;
        //   selectedTodo.isPending = selectedTodo?.isPending;
          allTodos.push(selectedTodo);
        });
  
        return {
          ...state,
          todos: [...allTodos],
          isEdit: false,
        };
  
      case CLEAR_ALL_TODO:
        return {
          ...state,
          todos: [],
        };
  
      default:
        return state;
    }
  };
  export default todoReducer;




/*

import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_ALL_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  MARK_COMPLETED,
} from "../actions/actionTypes";

// Initial state for the todo reducer
const initialState = {
  // Array of todo items
  todos: [
    {
      id: 1,
      title: "TodoList 1",
      description: "This is first todo",
      isCompleted: true,
      isPending: false,
    },
    {
      id: 2,
      title: "TodoList 2",
      description: "This is second todo",
      isCompleted: false,
      isPending: true,
    },
    {
      id: 3,
      title: "TodoList 3",
      description: "This is third todo",
      isCompleted: false,
      isPending: true,
    },
  ],
  // Indicates whether an edit operation is in progress
  isEdit: false,
  // Id of the todo being edited
  editTodoId: "",
};

// Reducer function for managing todo state
const todoReducer = (state = initialState, action) => {
  // Declaring variables outside of switch statement
  let id, title, description, newTodoList;

  switch (action.type) {
    case ADD_TODO:
      // Adding a new todo
      ({ id, title, description } = action.payload);
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id,
            title: title,
            description: description,
            isCompleted: false,
            isPending: true,
          },
        ],
        // Indicating that an edit operation is in progress
        isEdit: action.isEdit,
      };

    case DELETE_TODO:
      // Deleting a todo by id
      newTodoList = state.todos.filter((item) => item.id != action.id);
      return {
        ...state,
        todos: newTodoList,
      };

    case EDIT_TODO: {
      // Editing a todo
      const editTodo = action.payload;
      let newEditTodo = state?.todos?.find((item) => item?.id === editTodo?.id);
      return {
        ...state,
        isEdit: action.isEdit,
        editTodo: newEditTodo,
      };
    }

    case UPDATE_TODO: {
      // Updating a todo
      const { todoId, todoTitle, todoDescription } = action.payload;
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: todoTitle,
            description: todoDescription,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        isEdit: false,
      };
    }

    case MARK_COMPLETED: {
      // Marking selected todos as completed
      const updatedCompletedTodos = state.todos.map((todo) => {
        if (action.payload.selectedTodoId.includes(todo.id)) {
          return {
            ...todo,
            isCompleted: true,
            isPending: false,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedCompletedTodos,
        isEdit: false,
      };
    }

    case CLEAR_ALL_TODO:
      // Clearing all todos
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
};

export default todoReducer;
  
*/