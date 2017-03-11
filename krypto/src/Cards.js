import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Cards extends React.Component {

	render () {
		return(
			<div className="Clearfix">
			<ul className="hlist">
			<li className="card-first">Cards:</li>
				<ReactCSSTransitionGroup
						   transitionName="card-anim"
						   transitionEnterTimeout={250}
						   transitionLeaveTimeout={250}>
				{this.props.cards.map((c) => {
					const key = this.props.cards.indexOf(c);
					const viz_key = c.id;
					return (
						   <li
						   key={viz_key}
    						className="card" 
						    onClick={() => this.props.addCard(key)}>
						    {c.display()}
						    </li>
						 )
				}
				)}
				</ReactCSSTransitionGroup>
			</ul>
			</div>
			)
	}
}


export default Cards