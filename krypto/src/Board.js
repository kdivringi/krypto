import React from 'react';

class Board extends React.Component {

	render () {
		return(
			<p>
				{this.props.board.map((c) => {
					const key = this.props.board.indexOf(c);
					return (<a 
						key={key}
						onClick={() => this.props.removeCard(key)}
						>{c.value}</a> )
				}
				)}
			{!this.props.canAddNumber() && <a onClick={() => this.props.addEq()}>=</a>}
			</p>
			)
	}
}


export default Board