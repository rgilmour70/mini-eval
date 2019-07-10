// eslint-disable-next-line
import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import axios from 'axios';

const READ_API = './api/read.php';

class ClassResults extends Component {

	constructor(props) {
		super(props);
		this.state = {
			...this.props
		};
	}

  getClassResults = () => {
    console.log('Getting class results...');
    axios({
      method: 'post',
      url: `${READ_API}`
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => this.setState({ readError: error.message }));
  }

	render() {
		return (
			<React.Fragment>
				<button class="btn" onClick={this.getClassResults()}>Check Class Results</button>
				<div className="class-results">RESULTS WILL GO HERE</div>
			</React.Fragment>
		)
	}

}

export default ClassResults;