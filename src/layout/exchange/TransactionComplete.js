import React from 'react';
import dictionary from '../../shared/dictionary/dictionary';
import { Link } from 'react-router-dom';

export default class TransactionComplete extends React.Component {

	getTransactionInfo = () => {
		return this.props.history.location.event.returnValues.amount
	};

	getCurrencyName = () => {
		const event = this.props.history.location.event;
		return event.event === 'TokenBought'
			? dictionary.app.weiLabel
			: dictionary.app.ramboTokenLabel;
	};

	render() {
		return(
			<div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
				<h5>
					{dictionary.transactionComplete.amountLabel(this.getTransactionInfo(), this.getCurrencyName())}
				</h5>
				<Link to={"/"}>
					<button className="btn-hover main">
						{dictionary.transactionComplete.backBtnTxt}
					</button>
				</Link>
			</div>
		)
	}
}