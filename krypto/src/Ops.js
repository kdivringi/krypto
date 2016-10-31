import React from 'react';

class Ops extends React.Component {

	render () {
		return(
			<p>
			<span onClick={() => this.props.addOp("+")}> + </span> 
			<span onClick={() => this.props.addOp("-")}> - </span> 
			<span onClick={() => this.props.addOp("*")}> * </span> 
			<span onClick={() => this.props.addOp("/")}> / </span>
			</p>
			)
	}
}


export default Ops