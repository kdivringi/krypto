import React from 'react';

class Eqs extends React.Component {

	render () {
		return(
			<div className="Clearfix">
			<ul className="vlist">
				{this.props.eqs.map((c) => {
					const key = this.props.eqs.indexOf(c);
					const last = 0 === key;
					if (last) {
						return (<li key={key}
									onClick={() => this.props.removeEq(key)}
									className="eqn eqn-active">{c.value} 
									<div className="small-detail"> (Remove)</div>
							</li> )
					} else {
						return (<li key={key} className="eqn">{c.value}</li> )
					}
				}
				)}
			</ul>
			</div>
			)
	}
}


export default Eqs