import React,{useState,useEffect} from 'react'
import TodoList from './Components/TodoList'
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const App =  () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [ desc, setDesc] = useState('');
  const[isUpdating, setIsUpdating]= useState(false);
  const[updatedId,setUpdateId]= useState(Number);
  useEffect (() =>  {
    axios.get(`${baseUrl}/todos`).then(response => setTodos(response.data));
     //console.log(todos);
  }, []);
  //console.log(todos);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
         const newTodo = {
           title : title,
           desc: desc
         }
         axios.post(`${baseUrl}/todos`,newTodo).then(response=>{
           if(response.status=== 200){
          axios.get(`${baseUrl}/todos`).then(response => setTodos(response.data));}
        });
        setTitle('');
        setDesc('');
  }
const handleUpdateTodoItem= (id: any)=>{
setIsUpdating(true);
  const obj: any= todos.filter((item: any)=> item.id== id);
 console.log(obj);
 var deleteobj= obj[Object.keys(obj)[0]];
 setTitle(deleteobj.title);
 setDesc(deleteobj.desc);
 setUpdateId(deleteobj.id);
}
const handleUpdation = ()=>{
  const updatedTodo = {
    title : title,
    desc: desc
  }
  axios.put(`${baseUrl}/todos/${updatedId}`,updatedTodo).then(response=>{
    if(response.status===204){
      axios.get(`${baseUrl}/todos`).then(response => setTodos(response.data));
      setIsUpdating(false);
    }
  })
  setTitle('');
  setDesc('');
}

  console.log(todos);
  return (
    <div className="container mt-5 ">
      <h1 className="text-center">Todo Application</h1>
    <div className="row d-flex justify-content-center mt-3">
      <div className="col-sm-12">
    <form className="form-group"onSubmit={(e)=>handleSubmit(e)}>
           <input type="text" className="form-control w-100"placeholder="Enter the Title of Todo" required value={title}onChange={(e: React.FormEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)}/>
           <br/>
           <input type="text"className="form-control w-100" placeholder="Enter description" value={desc} onChange={(e: React.FormEvent<HTMLInputElement>)=> setDesc(e.currentTarget.value)}/>
           <br/>
           <button type="submit" className="btn btn-sm btn-success w-100 d-block m-auto">Add Todo</button><br/>
           {isUpdating && <button className="btn btn-sm btn-primary w-100 d-block m-auto" onClick={handleUpdation}>Update</button>}
    </form>
    </div>
    <div className="col-sm-12">
          <TodoList todos={todos} setTodos={setTodos} handleUpdateTodoItem={handleUpdateTodoItem}/>
    </div>
    </div>
    </div>
  )
}

export default App
