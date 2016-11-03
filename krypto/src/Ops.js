import React from 'react';

class Ops extends React.Component {

	render () {
		return(
			<div className="Clearfix">
			<ul className="Ops">
			<li className="btn" onClick={() => this.props.addOp("+")}> + </li> 
			<li className="btn" onClick={() => this.props.addOp("-")}> &minus; </li> 
			<li className="btn" onClick={() => this.props.addOp("*")}> &times; </li> 
			<li className="btn" onClick={() => this.props.addOp("/")}> &divide; </li>
			</ul>
			</div>
			)
	}
}


export default Ops