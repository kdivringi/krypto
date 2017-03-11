import React from 'react';
import { Op } from './cardUtils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Board extends React.Component {

	canAddNumber() {
		if (this.props.board.length === 0) {
			return true
		} else if (this.props.board[this.props.board.length - 1] instanceof Op) {
			return true
		} else {
			return false
		}
	}

	render () {
		return(
			<div className="Clearfix">
			<ul className="hlist">
				<ReactCSSTransitionGroup
				   transitionName="card-anim"
				   transitionEnterTimeout={250}
				   transitionLeaveTimeout={250}>
				{this.props.board.map((c) => {
					const key = this.props.board.indexOf(c);
					return (<li
						className="card" 
						key={key}
						onClick={() => this.props.removeCard(key)}
						>{c.display()}</li> )
				}
				)}
				</ReactCSSTransitionGroup>
			{!this.canAddNumber() && 
				this.props.board.length > 1 && 
				<li className="card" onClick={() => this.props.addEq()}>=</li>}
			</ul>
			</div>
			)
	}
}


export default Board