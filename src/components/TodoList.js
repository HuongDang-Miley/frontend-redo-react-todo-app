import React from 'react'
import '../App.css'

const TodoList = ({ todoList, handleOnDelete }) => {
    return (
        todoList.map(({ id, name }) => {
            return (
                <li key={id}>{name}
                    <button className="edit">Edit</button>
                    <button
                        className="delete"
                        key={id}
                        onClick={handleOnDelete}
                    >Delete</button>
                </li>
            )
        })
    )
}

export default TodoList
