import React from 'react'
import '../App.css'

const TodoList = ({ todoList, handleDeleteButton, handEditButton }) => {

    return (
        todoList.map(({ id, name }) => {
            return (
                <li key={id}>{name}
                    <button
                        className="edit"
                        onClick={() => handEditButton(id)}
                    >Edit</button>
                    
                    <button
                        className="delete"
                        onClick={() => handleDeleteButton(id)}
                    >Delete</button>
                </li>
            )
        })
    )
}

export default TodoList
