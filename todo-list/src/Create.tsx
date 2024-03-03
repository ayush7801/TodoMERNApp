import { useState } from 'react'
import './Create.css'
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState("Chill");
  function handleAdd(){
    axios.post("http://localhost:3001/add", { Task: task })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  }
  return (
    <div className="createTask">
        <input type="text" placeholder='Input Task Here' name="insertTask" id="insertTask" onChange={(e) => setTask(e.target.value)}/>
        <button type="submit" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create