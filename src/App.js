import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Classify from './components/classify/classify';

const API_PATH = './api/write.php';

class App extends Component {

  state = {
          "text" : "Drag each source type to the column that matches its degree of review.",
          "answerObject" : {},
          "items" : {
            "item-1" : {
              "id" : "item-1",
              "content" : "Empirical Research Study"
            },
            "item-2" : {
              "id" : "item-2",
              "content" : "Book"
            },
            "item-3" : {
              "id" : "item-3",
              "content" : "Tweet"
            },
            "item-4" : {
              "id" : "item-4",
              "content" : "Newspaper Article"
            },
            "item-5" : {
              "id" : "item-5",
              "content" : "Scholarly Article"
            },
            "item-6" : {
              "id" : "item-6",
              "content" : "Website"
            }
          },
          "columns" : {
            "column-1" : {
              "id" : "column-1",
              "title" : null,
              "itemIds" : ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"]
            },
            "column-2" : {
              "id" : "column-2",
              "title" : "No Review",
              "itemIds" : []
            },
            "column-3" : {
              "id" : "column-3",
              "title" : "Editorial Review",
              "itemIds" : []
            },
            "column-4" : {
              "id" : "column-4",
              "title" : "Peer Review",
              "itemIds" : []
            }
          },
          "columnOrder" : ["column-1", "column-2", "column-3", "column-4"],
          "correctAnswer" : {
            "item-1" : "column-4",
            "item-2" : "column-3",
            "item-3" : "column-2",
            "item-4" : "column-3",
            "item-5" : "column-4",
            "item-6" : "column-2"
          },
          "correctResponse" : "You're brilliant! You got it exactly right!",
          "incorrectResponse" : "<p>Not quite. Here are the correct answers:</p><table><tr><td>Empirical Research Study</td><td>Peer Review</td></tr><tr><td>Book</td><td>Editorial Review</td></tr><tr><td>Tweet</td><td>No Review</td></tr><tr><td>Newspaper Article</td><td>Editorial Review</td></tr><tr><td>Scholarly Article</td><td>Peer Review</td></tr><tr><td>Website</td><td>No Review</table>",
          "error" : ""
        };

  writeToDatabase = (userInput) => {
    console.log(userInput);
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: userInput
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => this.setState({ error: error.message }));
  };

  render() {
    return (
      <div className="App">
        <h1>Levels of Review</h1>
        <p>Drag the resource types (green) into the appropriate column based on their level of review.</p>
        <Classify {...this.state} writeToDatabase={this.writeToDatabase} />
      </div>
    );
  }
  
}

export default App;
