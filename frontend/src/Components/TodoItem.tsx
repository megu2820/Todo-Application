import axios from 'axios';
import React from 'react';
const baseUrl = 'http://localhost:3000';


const TodoItem = (props: {todo:{title: string, id: number, desc: string, isComplete: boolean},setTodos : any,handleupdatetodo: (id: any)=> void}) => {

  const handleDelete = (id: any)=> {
    axios.delete(`${baseUrl}/todos/${id}`).then(response => {

      if(response.status===204){
        axios.get(`${baseUrl}/todos`).then(response => props.setTodos(response.data));
      }
    })
    }
    const handleUpdate = (id: any)=>{
      props.handleupdatetodo(id)
    }



   const  checkItem =(id: any)=> {
     console.log(id);
     id= id.charAt(id.length -1);
     console.log(id);

   if ( (document.getElementById(("checkbox"+`${props.todo.id}`)) as HTMLInputElement).checked) {
      (document.getElementById(("title"+`${props.todo.id}`)) as HTMLInputElement).style.textDecoration = "line-through";
      axios.patch(`${baseUrl}/todos/${props.todo.id}`,{ isComplete: true }).then((response)=> {
        console.log(response);
      if(response.status== 204){
        axios.get(`${baseUrl}/todos`).then(response => props.setTodos(response.data));
      }}
      )
    }else{
      (document.getElementById(("title"+`${props.todo.id}`)) as HTMLInputElement).style.textDecoration = "none";
      axios.patch(`${baseUrl}/todos/${props.todo.id}`,{isComplete: false }).then((response)=> {
        if(response.status== 204){
          axios.get(`${baseUrl}/todos`).then(response => props.setTodos(response.data));
        }})
    }

    }

  console.log(props);
  return (

    <div className="list-group">

            <label className="list-group-item d-flex gap-3 mr-2">

                 <span className="pt-1 form-checked-content w-100">
                 <input className="form-check-input flex-shrink-0 " type="checkbox" id={"checkbox" +`${props.todo.id}`} defaultChecked={props.todo.isComplete} style={{fontSize: '1.375em'}} onClick={(e)=>checkItem(e.currentTarget.id)} />
                  <strong id ={"title"+`${props.todo.id}`} style={props.todo.isComplete ? {textDecoration: "line-through"}: {textDecoration: "none"}}>{props.todo.title}</strong>
                  <small className="d-block text-muted">{props.todo.desc}</small>

                  </span>
                  <div className="w-100">

                  <button className="btn btn-sm btn-primary mr-2 ml-2" style={{float: 'right'}}id = {`${props.todo.id}`} onClick={(e)=> handleUpdate(e?.currentTarget.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger"style={{float: 'right'}} id = {`${props.todo.id}`} onClick={(e)=> handleDelete(e?.currentTarget.id)}>Delete</button>
                  </div>
                </label>




    </div>
  )
}

export default TodoItem
