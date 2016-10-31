import React from 'react';

class Score extends React.Component {

	render () {
		return(
			<p>Target: {this.props.target} | Score: {this.props.score}
			</p>
			)
	}
}


export default Score