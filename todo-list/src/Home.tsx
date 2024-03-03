import { useEffect, useState } from 'react'
import axios from 'axios';
import Create from './Create'
import TodoCard from './TodoCard';

import './Home.css'

interface todo {
  _id: String;
  task: String;
  done: boolean;
};

function Home() {
    const [todos, setTodos]  = useState<todo[]>([]);
    useEffect(() => {
      axios.get("http://localhost:3001/get")
      .then(res => {
        console.log(res);
        setTodos(res.data);
      })
      .catch(err => console.log(err))
    }, [])

  return (
    <div className='home'>
        <h1>Todo List</h1>
        <Create />
        {todos.length === 0 ? <h3>No Task to do, enjoy!!!</h3> : todos.map((todo) => <TodoCard todo = {todo} />)}
    </div>
  )
}

export default Home