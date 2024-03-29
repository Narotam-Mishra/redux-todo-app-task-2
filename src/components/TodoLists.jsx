import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, markTodoCompleted, clearAlltodo } from "../redux/actions";

export const TodoLists = () => {
  // Retrieve todos from Redux state
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  // State to manage selected todos for bulk actions
  const [selectedTodo, setSelectedTodo] = useState([]);

  // Handle click events for action buttons (edit/delete)
  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    } else if (data && data?.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  // Handle checkbox change events
  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      if (selectedTodo.indexOf(todoId) === -1) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (e?.target?.name !== "select_all_todo" && e?.target?.checked === false) {
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);
        for (let chk of allChkbox) {
          chk.checked = true;
          let todoId = todo?.id;
          setSelectedTodo((todo) => [
            ...todo,
            todoId
          ]);
        }
      });
    }

    else if (e?.target?.name === "select_all_todo" && e?.target?.checked === false) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);
        for (let chk of allChkbox) {
          chk.checked = false;
          setSelectedTodo([]);
        }
      });
    }
  };

  // Mark selected todos as completed
  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo));
  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col-xl-12 text-right">
          {/* Show bulk action buttons when at least one todo is selected */}
          {selectedTodo.length > 0 && (
            <div style={{display:"flex", gap:"10px"}}>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(clearAlltodo())}
              >
                Clear All Todos
              </button>
              <button className="btn btn-success ml-2" onClick={markCompleted}>
                Mark As Completed
              </button>
            </div>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="3%">
              {/* Checkbox for selecting all todos */}
              <input
                type={"checkbox"}
                onChange={(e) => changeEvent(e)}
                name={"select_all_todo"}
              />
            </th>
            <th width="30%">Name</th>
            <th width="42%">Description</th>
            <th width="8%">Status</th>
            <th width="20%">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* Display todos */}
          {todos &&
            todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  {/* Checkbox for individual todo */}
                  <input
                    type={"checkbox"}
                    value={todo?.id}
                    onChange={(e) => changeEvent(e, todo?.id)}
                    name={`todo_${index}`}
                  />
                </td>
                <td>{todo?.title}</td>
                <td>{todo?.description}</td>
                <td>
                  {/* Display status badge */}
                  {todo?.isCompleted ? (
                    <span style={{color:"#fff", backgroundColor:"green"}}>Completed</span>
                  ) : todo?.isPending ? (
                    <span style={{color:"#fff", backgroundColor:"red"}}>Pending</span>
                  ) : (
                    <span>Unknown</span>
                  )}
                </td>
                <td>
                  {/* Edit and delete buttons */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => actionClick({ todo: todo, type: "edit" })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        actionClick({ todo: todo, type: "delete" })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
