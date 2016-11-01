import React from 'react';

class Ops extends React.Component {

	render () {
		return(
			<ul className="Ops">
			<li className="btn" onClick={() => this.props.addOp("+")}> + </li> 
			<li className="btn" onClick={() => this.props.addOp("-")}> - </li> 
			<li className="btn" onClick={() => this.props.addOp("*")}> * </li> 
			<li className="btn" onClick={() => this.props.addOp("/")}> / </li>
			</ul>
			)
	}
}


export default Ops