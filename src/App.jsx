
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo } from './components/AddTodo';
import { TodoLists } from './components/TodoLists';

function App() {

  return (
    <div className="container p-4 mt-2">
      <h2 style={{textAlign:"center"}}>Todo Application</h2>
      <AddTodo />
      <TodoLists />
    </div>
  )
}

export default App
