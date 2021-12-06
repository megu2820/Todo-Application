import React from 'react'
import TodoItem from './TodoItem'

const TodoList = (props: {todos:{title: string, id: number, desc: string, isComplete: boolean}[],setTodos: any,handleUpdateTodoItem: (id: any)=> void}) => {
  const handleupdatetodo = (id: any)=>{
   props.handleUpdateTodoItem(id);
  }
  return (
    <div >

            {props.todos.map((todo)=> <TodoItem todo={todo} key={todo.id} setTodos={props.setTodos} handleupdatetodo={handleupdatetodo}/>)}

    </div>
  )
}

export default TodoList
