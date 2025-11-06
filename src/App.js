import React, {useState, useEffect} from "react";
import "./App.css";

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks)setTasks(savedTasks);
  }, []);


useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


//Add new task
const addTask = () => {
  if (newTask.trim() === "")return;
  const task = {id: Date.now(), text: newTask, completed:false};
  setTasks([...tasks, task]);
  setNewTask("");
};

const toggleTask = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? {...task, completed: !task.completed } : task
    )
  );
};


const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
};

return (
  <div className="app">
    <h1>My To-Do List</h1>
    <div className="input-section">
      <input
      type="text"
      placeholder="Add a new task..."
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>

    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed": ""}>
          <span onClick={() => toggleTask(task.id)}>{task.text}</span>
          <button onClick={() => deleteTask(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  </div>
  );
}
export default App;
