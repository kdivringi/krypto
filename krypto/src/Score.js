import React from 'react';
import Toolbar from './Toolbar.js';


class Score extends React.Component {

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
			<ul className="hlist">
			<li>Target: {this.props.target} | Score: {this.props.score}</li>
			</ul>
			{this.renderWin()}
			</div>
			)
	}
}


export default Score