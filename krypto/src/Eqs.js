import React from 'react';

class Eqs extends React.Component {

	render () {
		return(
			<div><ul className="hlist">
				{this.props.eqs.map((c) => {
					const key = this.props.eqs.indexOf(c);
					const last = (this.props.eqs.length - 1) === key;
					if (last) {
						return (<li key={key}
									onClick={() => this.props.removeEq(key)}
									className="card">{c.value} = (Remove)
							</li> )
					} else {
						return (<li key={key} className="card">{c.value}</li> )
					}
				}
				)}
			</ul></div>
			)
	}
}


export default Eqs