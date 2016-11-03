import React from 'react';

class Toolbar extends React.Component {

	render () {
		return(
			<div className="Toolbar Clearfix"> 
			<a className="btn" onClick={() => this.props.newGame()}>New Game</a>
			<a className="btn" onClick={() => this.props.reset()}> Reset</a></div>
			)
	}
}


export default Toolbar