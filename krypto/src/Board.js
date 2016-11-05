import React from 'react';

class Board extends React.Component {

	renderPlaceHolder(board) {
		if (board.length===0 && this.props.eqs.length===0) {
			return <p className="board-placeholder">
			(Click the number cards above to get started)
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