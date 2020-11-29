import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid";
import './App.css'
import TodoList from './components/TodoList'
import Login from './components/login/Login'


export default class App extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        name: 'redo React',
        toggleEdit: false
      },
      {
        id: uuidv4(),
        name: 'forward order on eBay',
        toggleEdit: false
      },
      {
        id: uuidv4(),
        name: 'place order on SheIn',
        toggleEdit: false
      }
    ],
    isAuth: false,
    inputValue: "",
    submitError: false,
    submitErrorMessage: "",
    noTodo: false,
    noTodoMessage: "",
  }



  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddButton = (event) => {
    // prevent page from auto refresh after submitting the input
    event.preventDefault()

    if (this.state.inputValue === '') {
      this.setState({
        submitError: true,
        submitErrorMessage: "please type something",
      })
      return;
    }

    let newTodo = {
      id: uuidv4(),
      name: this.state.inputValue
    }
    let newTodoList = [...this.state.todoList, newTodo]
    this.setState({
      todoList: newTodoList,
      submitError: false,
      inputValue: "",
      noTodo: false
    })
  }


  handleDeleteButton = (id) => {
    let newTodoList = this.state.todoList.filter((item) => item.id !== id)
    this.setState({
      todoList: newTodoList
    }
      ,
      () => {
        if (newTodoList.length === 0) {
          this.setState({
            noTodo: true,
            noTodoMessage: "You don't have any todo, please add todo"
          })
        }
      }
    )


  }

  handEditButton = (targetId) => {
    console.log(targetId)
    let copyTodoList = [...this.state.todoList]
    copyTodoList.map(item => {
      if (item.id === targetId) {
        item.toggleEdit = true
      }
      // else {
      //   item.toggleEdit=false
      // }
      return item
    })

    console.log(copyTodoList)
    this.setState({
      todoList: copyTodoList
    })
  }

  handleUpdateButton = (id) => {
    console.log('this is id in line 0=106', id)
    console.log(this.state.inputValue)
    // let copyArr = [...this.state.todoList]


  }

  render() {
    let { todoList,
      inputValue,
      submitError,
      submitErrorMessage,
      noTodo,
      noTodoMessage,
      isAuth
    } = this.state
    return (
      <div>
        {isAuth
          ? <div>
            {submitError ? <p className="error-message">{submitErrorMessage}</p> : ""}
            <form>
              <input
                onChange={this.handleInputChange}
                type="text"
                name="inputValue"
                value={inputValue}
              ></input>

              <button
                className="edit"
                onClick={this.handleAddButton}
              >Add</button>

            </form>
            {noTodo
              ? <p className="general-message">{noTodoMessage}</p>
              : <TodoList
                todoList={todoList}
                handleDeleteButton={this.handleDeleteButton}
                handEditButton={this.handEditButton}
                handleUpdateButton={this.handleUpdateButton}
                inputValue={this.state.inputValue}
                handleInputChange={this.handleInputChange}
              />
            }
          </div>
          : <Login />
        }


      </div>
    )
  }
}
