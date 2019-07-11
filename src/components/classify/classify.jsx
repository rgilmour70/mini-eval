// eslint-disable-next-line
import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import Column from './column';
import Feedback from '../feedback';

const Container = styled.div`
	display: block;
`;

class Classify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			...this.props,
			tried: false,
			correct: false
		}
	}


	onDragEnd = result => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {

			// move within column
			const newResourceIds = Array.from(start.itemIds);
			newResourceIds.splice(source.index, 1);  // remove item
			newResourceIds.splice(destination.index, 0, draggableId);  // insert item

			const newColumn = {
				...start,
				itemIds: newResourceIds
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn 
				}
			};

			this.setState(newState);
			return;

		}

		const startResourceIds = Array.from(start.itemIds);
		startResourceIds.splice(source.index, 1);
		const newStart = {
			...start,
			itemIds: startResourceIds
		};


		const finishTaskIds = Array.from(finish.itemIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			itemIds: finishTaskIds
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};

		this.setState(newState);

	};


	onFinish = () => {

		this.setState({ tried: true });

		const correctResponse = this.state.correctResponse;
		const incorrectResponse = this.state.incorrectResponse;

		const answerKey = JSON.stringify(this.state.correctAnswer);
		// console.log(answerKey);

		let userInput = {};

		for (let j=1; j<=Object.keys(this.state.correctAnswer).length; j++) {
			let label = 'item-' + j;
			userInput[label] = '';

			for (let i=1; i<=Object.keys(this.state.columns).length; i++) {
				let col = 'column-' + i;
				let colContents = this.state.columns[col].itemIds;
				if (colContents.includes(label)) { 
					// this col contains the current item
					userInput[label] = col;
				}
			}
		}
		const userInputString = JSON.stringify(userInput);
		// console.log(userInputString);

		// const isCorrect = Object.values(correctnessObj).every(Boolean);

		const isCorrect = answerKey === userInputString;

		if (isCorrect) {
			this.setState({ correct: isCorrect, response: correctResponse });
		} else {
			this.setState({ correct: isCorrect, response: incorrectResponse });
		}

	};


	render() {
		return (
			<React.Fragment>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Container>
						{this.state.columnOrder.map( (columnId, index) => {
							const column = this.state.columns[columnId];
							const items = column.itemIds.map( itemId => this.state.items[itemId]);

							if (index === 0) {
								return (
									<Column key={column.id} column={column} items={items} type="source-area" />
								);
							} else {
								return (
									<Column key={column.id} column={column} items={items} type="destination-area" />
								);
							}
						})}
					</Container>
				</DragDropContext>
				<button onClick={this.onFinish} className="btn btn-large check-answer">Check Answer</button>
				<Feedback response={this.state.response ? renderHTML(this.state.response) : ''} />
			</React.Fragment>
		)
	}

}

export default Classify;
