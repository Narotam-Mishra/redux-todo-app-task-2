// Importing necessary dependencies from React and Redux
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions";

// Functional component responsible for adding new todos
export const AddTodo = () => {
  // State variables for managing todo data and error messages
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  
  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const editTodo = useSelector((state) => state.todoReducer.editTodo);

  // Effect hook for updating todo data when editing
  useEffect(() => {
    // Populate todo data if in edit mode
    editTodo && setValue(() => editTodo);
  }, [editTodo]);

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Validation checks for todo title and description
    if (!value?.title) {
      setError((error) => ({
        ...error,
        title: 'Please enter todo title',
      }));
      return;
    }
    if (!value?.description) {
      setError((error) => ({
        ...error,
        description: 'Please enter todo description'
      }));
      return;
    }

    // Dispatching appropriate action based on edit mode
    if (isEdit) {
      dispatch(updateTodo(editTodo.id, value)); // Dispatch update action
    }
    else {
      dispatch(addNewTodo(value)); // Dispatch add new todo action
    }
    
    // Resetting form fields and error messages after submission
    setValue({title: '', description: ''});
    document.getElementById("todoForm").reset();
  };

  // Function to handle input changes and update state accordingly
  const changeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    
    // Clearing error message when input changes
    if (e?.target?.name === "title") {
      setError({
        title: "",
      });
    }
    if (e?.target?.name === "description") {
      setError({
        description: ""
      });
    }
  };

  // JSX rendering of the component
  return (
    <div className="container my-4 py-1 border">
      <form className="mt-3 mb-2" id="todoForm" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xl-3">
            {/* Input field for todo title */}
            <label className="sr-only">Name</label>
            <input
              type="text"
              name="title"
              className="form-control mb-2 mr-sm-3"
              placeholder="Todo Title"
              defaultValue={value?.title}
              onChange={(e) => changeEvent(e)}
            />
            {/* Display error message for todo title */}
            <span className="text-danger" style={{ marginTop: '0.5rem' }}>{error?.title}</span>
          </div>

          <div className="col-xl-3">
            {/* Input field for todo description */}
            <label className="sr-only">Description</label>
            <input
              type="text"
              name="description"
              className="form-control mb-2 mr-sm-3"
              placeholder="Add Todo description..."
              defaultValue={value?.description}
              onChange={(e) => changeEvent(e)}
            />
            {/* Display error message for todo description */}
            <span className="text-danger">{error?.description}</span>
          </div>

          <div className="col-xl-2">
            {/* Button for submitting todo */}
            <button className="btn btn-primary mt-4" type="submit"> {isEdit ? 'Update Todo' : 'Create Todo'} </button>
          </div>
        </div>
      </form>
    </div>
  );
};
