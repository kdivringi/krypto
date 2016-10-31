import React from 'react';

class Toolbar extends React.Component {

	render () {
		return(
			<p> <a onClick={() => this.props.newGame()}>New Game</a>
			<a onClick={() => this.props.reset()}> Reset</a></p>
			)
	}
}


export default Toolbar