import React from 'react';

class Cards extends React.Component {

	render () {
		return(
			<div><ul className="hlist">
				{this.props.cards.map((c) => {
					const key = this.props.cards.indexOf(c);
					return (<li
						className="card" 
						key={key}
						onClick={() => this.props.addCard(key)}
						>{c.value}</li> )
				}
				)}
			</ul></div>
			)
	}
}


export default Cards