import React from 'react';

class Score extends React.Component {

	render () {
		return(
			<div><ul className="hlist">
			<li>Target: {this.props.target} | Score: {this.props.score}</li>
			</ul></div>
			)
	}
}


export default Score