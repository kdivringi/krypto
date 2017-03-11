import React from 'react';
import Toolbar from './Toolbar.js';


class Score extends React.Component {

	renderPlaceHolder(board) {
		if (this.props.target===-1) {
			return <p className="board-placeholder">
			Click New Game to pick the cards and get started!
			</p> 
		} else if (this.props.board.length===0 && this.props.eqs.length===0) {
			return <p className="board-placeholder">
			Click one of the number cards to start playing
			</p>
		} else if (this.props.board.length===1 && this.props.eqs.length===0) {
			return <p className="board-placeholder">
			Now add an operation (+ - &times; &divide;)
			</p>
		} else if (this.props.eqs.length===0 && this.props.board.length === 3) {
			return (
				<p className="board-placeholder">
				Modify the operation order with parenthesis. Click the = button add them.
				</p>
			)
		}
	}


	renderWin () {
		if (this.props.target !== this.props.score ||
			this.props.cards.length !== 0) {
			return
		}

		return(
			<div className="win-back">
			<div className="win"> 
			<h2>You Win!</h2>
			<Toolbar newGame={this.props.newGame} reset={this.props.reset}/>
			</div>

			</div>
			)
	}

	render () {
		return(
			<div className="Clearfix">
			{this.renderPlaceHolder()}
			<ul className="hlist">
			<li>Target: {this.props.target} | Score: {this.props.score}</li>
			</ul>
			{this.renderWin()}
			</div>
			)
	}
}


export default Score