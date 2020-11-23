import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid";
import './App.css'

export default class App extends Component {
  state = {
    name: "huong",
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
    ]
  }
  render() {
    let { todoList } = this.state
    return (
      <div>
        {todoList.map(item => {
          return (
            <>
              <li>
                {item.name}
                <button>edit</button>
                <button>delete</button>
              </li>
            </>
          )
        })}
      </div>
    )
  }
}
