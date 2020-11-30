// command: rafcp
//<React.Fragment></React.Fragment> = <> </> to wrap more than one html tag
import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import "./todo.css"
import Span from "../shared/Span"

const TodoView = ({
    todoList,
    handleDeleteTodo,
    handleEditTodo,
    handleOnChange,
    editValue,
    disableEditButton,
    handleUpdateButton
}) => {
    console.log('=========')
    console.log(todoList)

    const handleDeleteButton = (id) => {
        console.log('ID:', id)
        handleDeleteTodo(id)
    }

    return (
        <ul style={{ listStyle: "none" }}>
            {todoList.map(({ _id, todo, editToggle }) => {

                return (
                    <>
                        <li key={_id} style={{ margin: 20 }}>
                            {/* {todo}{" "} */}
                            {editToggle
                                ? (
                                    <input
                                        onChange={(event) => handleOnChange(event)}
                                        type='text'
                                        value={editValue}
                                        name='editValue'
                                        defaultValue={todo}
                                    >
                                    </input>
                                )
                                : (
                                <Span value = {todo} />
                                )
                            }
                            {
                            editToggle
                                ? (
                                    // <span onClick={() => handleUpdateButton(id)}
                                    //     className="edit-button todo-button-shared-style" > update</span>
                                    <Span 
                                    value = {"Update"}
                                    id = {_id}
                                    onClick = {handleUpdateButton}
                                    className = {`blue-button`}
                                    />
                                )
                                : (
                                    // <span onClick={() => handleEditTodo(id)}
                                    //     className={`edit-button todo-button-shared-style ${disableEditButton ? "disabled-button" : ""}`} >Edit</span>
                                    <Span 
                                    value = {"Edit"}
                                    id = {_id}
                                    onClick = {handleEditTodo}
                                    className = {`blue-button`}
                                    disabledClass = "disabled-button"
                                    disabledButton = {disableEditButton}
                                    />
                                )
                          
                            }

                            {/* <span className={`delete-button todo-button-shared-style ${disableEditButton ? "disabled-button" : ""}`}
                                onClick={() => handleDeleteButton(id)}>Delete</span> */}

                            <Span
                                value={"Delete"}
                                id={_id}
                                onClick={handleDeleteButton}
                                className= {`delete`}
                                disabledClass="disabled-button"
                                disabledButton={disableEditButton}
                            />
                        </li>
                    </>
                );
            })} 
        </ul>

    )
}

TodoView.propTypes = {
    todoList: arrayOf(
        shape({
            id: string.isRequired,
            todo: string.isRequired,
        })
    )
}

export default TodoView
