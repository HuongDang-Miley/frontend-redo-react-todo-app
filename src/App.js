import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid";
import './App.css'
import TodoList from './components/TodoList'

export default class App extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        name: 'redo React',
      },
      {
        id: uuidv4(),
        name: 'forward order on eBay',
      },
      {
        id: uuidv4(),
        name: 'place order on SheIn',
      }
    ],
    inputValue: "",
    submitError: false,
    submitErrorMessage: "",
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = (event) => {
    // prevent page from auto refresh after submitting the input
    event.preventDefault()

    if (this.state.inputValue === '') {
      this.setState({
        submitError: true,
        submitErrorMessage: "please type something"
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
      inputValue: ""
    })
  }

  handleOnDelete = (id) => {
    let newTodoList = this.state.todoList.filter((item) => item.id !== id)
    this.setState({
      todoList: newTodoList
    })
  }

  render() {
    let { todoList, inputValue, submitError, submitErrorMessage } = this.state
    return (
      <div>
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
            onClick={this.handleOnSubmit}
          >Add</button>
        </form>

        <TodoList todoList={todoList} handleOnDelete={this.handleOnDelete} />
      </div>
    )
  }
}
