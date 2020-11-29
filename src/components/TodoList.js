import React from 'react'
import '../App.css'

const TodoList = ({ todoList,
    handleDeleteButton,
    handEditButton,
    handleUpdateButton,
    inputValue,
    handleInputChange,
    editTodoValue }) => {

    return (
        todoList.map(({ id, name, toggleEdit, disableButton }) => {
            return (
                <li key={id}>
                    {toggleEdit
                        ? <form>
                            <input
                                name="editTodoValue"
                                value={editTodoValue}
                                type="text"
                                onChange={(event) => handleInputChange(event)}
                            ></input>
                            <button
                                className={disableButton ? "disable" : "blue-button"}
                                onClick={(event) => handleUpdateButton(event)}
                            >Update</button>
                        </form>
                        :
                        <>
                            {name}
                            <button
                                className={disableButton ? "disable" : "blue-button"}
                                onClick={() => handEditButton(id)}
                            >Edit</button>
                        </>
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
