import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid";
import './App.css'

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
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddTodo = (event) => {
   
  }

  render() {
    let { todoList, inputValue } = this.state
    return (
      <div>
        <form>
          <input
            onChange={this.handleInputChange}
            type="text"
            name="inputValue"
            value={inputValue}
          ></input>
          <button
            className="edit"
            onClick={this.handleAddTodo}
          >Add</button>
        </form>
        {todoList.map(({ id, name }) => {
          return (
            <>
              <li key={id}>
                {name}
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </li>
            </>
          )
        })}
      </div>
    )
  }
}
