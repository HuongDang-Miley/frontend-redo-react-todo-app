import React from 'react'
import '../App.css'

const TodoList = ({ todoList, 
    handleDeleteButton, 
    handEditButton, 
    handleUpdateButton, 
    inputValue,
    handleInputChange }) => {

    return (
        todoList.map(({ id, name, toggleEdit }) => {
            return (
                <li key={id}>
                    {toggleEdit
                        ? <form>
                            <input></input>
                            <button
                                // onChange={handleInputChange}
                                // name="inputValue"
                                // // value={inputValue}
                                // value = {inputValue}
                                // type="text"
                                // className="edit"
                                // onClick={handleUpdateButton(id)}
                            >Update</button>
                        </form>
                        :
                        <>
                            {name}
                            <button
                                className="edit"
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
