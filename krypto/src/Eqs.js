import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Eqs extends React.Component {

	render () {
		return(
			<div className="Clearfix">
			<ul className="vlist">
				<ReactCSSTransitionGroup
				   transitionName="card-anim"
				   transitionEnterTimeout={250}
				   transitionLeaveTimeout={250}>
				{this.props.eqs.map((c) => {
					const key = this.props.eqs.indexOf(c);
					const viz_key = c.id;
					const last = 0 === key;
					if (last) {
						return (<li key={viz_key}
									onClick={() => this.props.removeEq(key)}
									className="eqn eqn-active">{c.display()} 
									<div className="small-detail"> (Remove)</div>
							</li> )
					} else {
						return (<li key={key} className="eqn">{c.display()}</li> )
					}
				}
				)}
				</ReactCSSTransitionGroup>
			</ul>
			</div>
			)
	}
}


export default Eqs