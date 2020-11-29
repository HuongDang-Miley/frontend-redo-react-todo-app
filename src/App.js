import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid";
import './App.css'
import TodoList from './components/TodoList'
import Login from './components/login/Login'
import Nav from './components/nav/Nav'


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
    editTodoValue: "",
    email: "",
    password: "",
  }



  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('event target name', event.target.name)
    console.log('handleInputChange line 44 App.js', this.state)
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
    let copyTodoList = [...this.state.todoList]

    let updateTodo
    copyTodoList.map(item => {
      if (item.id === targetId) {
        item.toggleEdit = true
        updateTodo = item.name
        item.disableButton = false
      }
      else {
        item.toggleEdit = false
        item.disableButton = true
      }
      console.log('line106', item)
      return item
    })
    this.setState({
      todoList: copyTodoList,
      editTodoValue: updateTodo
    })
  }

  handleUpdateButton = (event) => {
    event.preventDefault()
    let copyArr = [...this.state.todoList]

    copyArr.map((item) => {
      if (item.toggleEdit === true) {
        item.name = this.state.editTodoValue
      }
      item.toggleEdit = false
      item.disableButton = false
      return item
    })
    this.setState({
      todoList: copyArr
    })

  }

  handleLoginButton = () => {
    if (this.state.email === '' && this.state.password === '') {
      this.setState({
        isAuth: false
      })
      return;
    }

    this.setState({
      isAuth: true
    })
  }

  render() {
    let { todoList,
      inputValue,
      submitError,
      submitErrorMessage,
      noTodo,
      noTodoMessage,
      isAuth,
      editTodoValue,
      email,
      password
    } = this.state
    return (
      <>
        <Nav isAuth = {isAuth}/>
        <div className = 'body-div'> 
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
                  className="blue-button"
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
                  editTodoValue={editTodoValue}
                />
              }
            </div>
            : <Login
              email={email}
              password={password}
              handleInputChange={this.handleInputChange}
              handleLoginButton={this.handleLoginButton}
            />
          }


        </div>
      </>
    )
  }
}
