import React from 'react';

class Eqs extends React.Component {

	render () {
		return(
			<div>
				{this.props.eqs.map((c) => {
					const key = this.props.eqs.indexOf(c);
					return (<p key={key}>{c.value} =
						<a onClick={() => this.props.removeEq(key)}>(Remove)</a>
						</p> )
				}
				)}
			</div>
			)
	}
}


export default Eqs