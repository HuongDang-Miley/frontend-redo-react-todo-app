import React from 'react'
import '../App.css'

const TodoList = ({ todoList, handleDeleteButton, handEditButton }) => {

    return (
        todoList.map(({ id, name, ToggleEdit }) => {
            return (
                <li key={id}>{name}
                    {ToggleEdit
                        ? <button
                            className="edit"
                            onClick={() => handEditButton(id)}
                        >Update</button>
                        : <button
                            className="edit"
                            onClick={() => handEditButton(id)}
                        >Edit</button>
                    }

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
