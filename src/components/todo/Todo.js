import React, { Component } from 'react';
import axios from "axios";
import TodoView from "./TodoView";
import '../../App.css'
import { apiRequest } from '../utils/helpers'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default class Todo extends Component {
    state = {
        todoList: [],
        todoValue: "",
        editValue: "",
        showErrorMessage: false,
        showNoTodoMessage: false,
        disableEditButton: false,
    }

    handleInputChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    addFunc = () => { }


    handleDeleteTodo = async (targetId) => {
        // use jwtDecode to get id of current user
        let jwtToken = localStorage.getItem('jwtToken')
        let decoded = jwtDecode(jwtToken)
        try {
            // `axios return the id of the deleted todo from backend
            let deleteTodoId = await axios.delete(`http://localhost:3003/api/todo/delete-todo`,
                {
                    data: {
                        userId: decoded._id,
                        todoId: targetId,
                    },
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                    }
                },
            )

            // let deleteTodoId = await handleSubmitDeleteAPI(targetId)

            // let deleteTodoId = await apiRequest('delete', {todoId: targetId})
            // console.log('deleteTodoId', deleteTodoId)

            let copyArray = [...this.state.todoList]
            // filter array to return new array without the target deleted todo
            let newArrayWithoutTargetId = copyArray.filter(({ _id }) => _id !== deleteTodoId.data)

            // reset state so that the current todoList is the filter array
            this.setState({
                todoList: newArrayWithoutTargetId
            }, () => {
                if (this.state.todoList.length === 0) {
                    this.setState({
                        showNoTodoMessage: true,
                    })
                }
            },
            )
        }
        catch (e) { console.log('error line74', e.message) }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleEditTodo = async (targetId) => {

        let copyArray = [...this.state.todoList]
        let inputDefaultValue

        let updatedTodoArray = copyArray.map((item) => {
            if (item._id === targetId) {
                item.editToggle = true
                inputDefaultValue = item.todo
            }
            return item
        })

        this.setState({
            todoList: updatedTodoArray,
            editValue: inputDefaultValue,
            disableEditButton: true,
            showEditInput: true,
        },
        )
    }



    handleUpdateButton = async (targetId) => {
        try {
            // let updateTodo = await handleSubmitUpdateAPI(targetId, this.state.editValue)
            let updateTodo = await apiRequest('put',{ todoId: targetId, newTodoValue: this.state.editValue})

            let copyArray = [...this.state.todoList]

            let updatedTodoArray = copyArray.map((item) => {
                console.log(item)
                if (item._id === targetId) {
                    item.editToggle = false
                    item.todo = updateTodo.data.todo
                }
                return item
            })

            console.log('updatedTodoArray', updatedTodoArray)

            this.setState({
                todoList: updatedTodoArray,
                disableEditButton: false,
            },
            )

        }
        catch (e) { console.log(e) }


    }

    async componentDidMount() {
        try {
            // let jwtToken = localStorage.getItem('jwtToken')
            // let decoded = jwtDecode(jwtToken)
            // // way1: use query in the link: query is the part after  ?
            // // let allUserTodos = await axios.get(`http://localhost:3003/api/todo/get-user-all-todo?userID=${decoded._id}`)
            // way2: use param in the link, param is the part after the /
            // let allUserTodos = await axios.get(`http://localhost:3003/api/todo/get-user-all-todo/${decodedToken._id}`,
            //     {
            //         headers: {
            //             authorization: `Bearer ${getLocalStorageToken()}`,
            //         }
            //     }
            // )


            let allUserTodos = await apiRequest('get');
            // let allUserTodos = await getAllUserTodos();

            let todoArrays = allUserTodos.data.todos;

            todoArrays = todoArrays.map((todo) => {
                todo.isToggle = false;
                return todo
            })

            this.setState({
                todoList: allUserTodos.data.todos
            })

        } catch (e) {
            console.log(e)
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        // let jwtToken = getLocalStorageToken()
        // let decoded = jwtDecode(jwtToken)

        // if (this.state)

        if (this.state.todoValue.length === 0) {
            this.setState({
                showErrorMessage: true,
            })
            return
        }

        try {
            // let createdTodo = await axios.post('http://localhost:3003/api/todo/create-todo',
            //     {
            //         todo: this.state.todoValue,
            //         // way 1: put user, author to prop in private route and implement as below
            //         _id: this.props.user._id
            //         // way 2:
            //         // _id: decoded._id
            //     },
            //     {
            //         headers: {
            //             authorization: `Bearer ${jwtToken}`,
            //         }
            //     })

            // let createdTodo = await handleSubmitTodoAPI(this.state.todoValue)

            let createdTodo = await apiRequest('post', { todo: this.state.todoValue })

            let newArray = [...this.state.todoList, createdTodo.data.savedTodo]
            console.log('newArray', newArray)
            this.setState({
                todoList: newArray,
                todoValue: "",

            }, () => {
                if (this.state.todoList.length > 0) {
                    this.setState({
                        showNoTodoMessage: false
                    })
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {

        const { todoList, showErrorMessage, showNoTodoMessage, editValue, disableEditButton } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {showErrorMessage
                    ? <div style={{ color: "red", marginTop: 20 }}>Please, Enter Something Todo</div>
                    : null}
                <input
                    onChange={this.handleInputChange}
                    style={{ marginTop: 30 }}
                    type="text"
                    name="todoValue"
                    value={this.state.todoValue} />{""}
                <button className = "blue-button" onClick={this.handleSubmit}>Add</button>

                {showNoTodoMessage
                    ? (<div style={{ marginTop: 20 }}>Please Add Something To Do</div>)
                    : (<TodoView
                        todoList={todoList}
                        handleDeleteTodo={this.handleDeleteTodo}
                        handleEditTodo={this.handleEditTodo}
                        handleOnChange={this.handleOnChange}
                        editValue={editValue}
                        disableEditButton={disableEditButton}
                        handleUpdateButton={this.handleUpdateButton}
                    />)
                }
            </div>
        )
    }
}
