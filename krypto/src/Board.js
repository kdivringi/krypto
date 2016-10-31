import React from 'react';

class Board extends React.Component {

	render () {
		return(
			<p>
				{this.props.board.map((c) => {
					return (<a key={this.props.board.indexOf(c)}>{c.value}</a> )
				}
				)}
			</p>
			)
	}
}


export default Board