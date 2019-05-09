// eslint-disable-next-line
import React, { Component } from 'react';
// import renderHTML from 'react-render-html';

const Feedback = (props) => {
	if (props.response !== '') {
		return (
			<div className="feedback">
				<div>{props.response}</div>
			</div>
		);
	} else {
		return null;
	}

};

export default Feedback;