import React from 'react';

class Cards extends React.Component {

	render () {
		return(
			<p>
				{this.props.cards.map((c) => {
					const key = this.props.cards.indexOf(c);
					return (<a 
						key={key}
						onClick={() => this.props.addCard(key)}
						>{c.value}</a> )
				}
				)}
			</p>
			)
	}
}


export default Cards