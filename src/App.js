import React, { Component } from 'react';
import './App.css';
import Classify from './components/classify/classify';

class App extends Component {

  state = {
          "text" : "Drag each source type to the column that matches its degree of review.",
          "answerObject" : {},
          "items" : {
            "item-1" : {
              "id" : "item-1",
              "content" : "Tweet"
            },
            "item-2" : {
              "id" : "item-2",
              "content" : "Article"
            },
            "item-3" : {
              "id" : "item-3",
              "content" : "Book"
            },
            "item-4" : {
              "id" : "item-4",
              "content" : "Wikipedia Entry"
            },
            "item-5" : {
              "id" : "item-5",
              "content" : "Newspaper"
            },
            "item-6" : {
              "id" : "item-6",
              "content" : "Soup Can"
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
            "item-1" : "column-2",
            "item-2" : "column-4",
            "item-3" : "column-3",
            "item-4" : "column-3",
            "item-5" : "column-3",
            "item-6" : "column-2"
          },
          "correctResponse" : "You're brilliant!",
          "incorrectResponse" : "It's a good thing you're pretty."
        };

  recordAnswer = (isCorrect) => {
    console.log(isCorrect);
  }

  render() {
    return (
      <div className="App">
        <Classify {...this.state} recordAnswer={this.recordAnswer} />
      </div>
    );
  }
  
}

export default App;
