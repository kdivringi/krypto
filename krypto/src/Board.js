import React from 'react';

class Board extends React.Component {

	render () {
		return(
			<div className="Clearfix">
			<ul className="hlist">
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