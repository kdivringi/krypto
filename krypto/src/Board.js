import React from 'react';

class Board extends React.Component {

	renderPlaceHolder(board) {
		if (this.props.target===-1) {
			return <p className="board-placeholder">
			(Click New Game to pick the cards and target to get started!)
			</p> 
		} else if (board.length===0 && this.props.eqs.length===0) {
			return <p className="board-placeholder">
			(Click the number cards above to get started)
			</p>
		} else if (board.length===1 && this.props.eqs.length===0) {
			return <p className="board-placeholder">
			(Now add an operation (+ - &times; &divide;)
			</p>
		} 
	}

	render () {
		return(
			<div className="Clearfix">
			<ul className="hlist">
				{this.renderPlaceHolder(this.props.board)}
				{this.props.board.map((c) => {
					const key = this.props.board.indexOf(c);
					return (<li
						className="card" 
						key={key}
						onClick={() => this.props.removeCard(key)}
						>{c.value}</li> )
				}
				)}
			{!this.props.canAddNumber() && <li className="card" onClick={() => this.props.addEq()}>=</li>}
			</ul>
			</div>
			)
	}
}


export default Board