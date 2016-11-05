import React from 'react';

class Cards extends React.Component {

	render () {
		return(
			<div className="Clearfix">
			<ul className="hlist">
			<li className="card-first">Cards:</li>
				{this.props.cards.map((c) => {
					const key = this.props.cards.indexOf(c);
					return (<li
						className="card" 
						key={key}
						onClick={() => this.props.addCard(key)}
						>{c.value}</li> )
				}
				)}
			</ul>
			</div>
			)
	}
}


export default Cards