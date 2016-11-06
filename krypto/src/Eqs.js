import React from 'react';

class Eqs extends React.Component {

	renderPlaceHolder (eqs, board) {
		if (eqs.length===0 && board.length === 3) {
			return (
				<p className="board-placeholder">
				Modify the operation order by placing equations here. Click the = button to do so.
				</p>
			)
		}
	}

	render () {
		return(
			<div className="Clearfix">
			<ul className="vlist">
				{this.renderPlaceHolder(this.props.eqs, this.props.board)}
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