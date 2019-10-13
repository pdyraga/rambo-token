import React from 'react';
import ExchangeForm from './form/ExchangeForm';
import web3Service, { AccountContext } from '../../shared/service/web3/web3.service';
import { MARKET_CONTRACT_ADDRESS } from '../../config/contracts/market-contract.config';
import dictionary from '../../shared/dictionary/dictionary';

class Exchange extends  React.Component {

	getExchangeType = () => {
		return this.props.match.params.type;
	};

	navigateToInProgressPage = (transactionHash) => {
		this.props.history.push(`/exchange/in-progress/${transactionHash}`)
	};

	onSubmit = (value, errorCallback = () => {}) => {
		if(this.getExchangeType() === 'sell'){
			this.salesApprovalRequest(value)
				.then((approveReceipt) => this.sell(approveReceipt, value))
				.catch(error => errorCallback(error.message));
			return;
		}

		web3Service.getMarketContract().methods
			.buy()
			.send({ from: this.props.context.account, value: value.toString() })
			.on('transactionHash', this.navigateToInProgressPage)
			.on('error', error => errorCallback(error.message));
	};

	salesApprovalRequest = (value) => web3Service.getTokenContract().methods
		.approve(MARKET_CONTRACT_ADDRESS, value.toString())
		.send({ from: this.props.context.account });

	sell = (approveReceipt, value) => web3Service.getMarketContract().methods
		.sell(value.toString(), this.props.context.account)
		.send({ from: this.props.context.account })
		.on('transactionHash', this.navigateToInProgressPage)
		.on('error', error => console.log('transaction error:', error.message));

	onGoBackBtn = () => {
		this.props.history.goBack();
	};

	render(){
		return(
			<ExchangeForm
				onSubmit={this.onSubmit}
				exchangeType={this.getExchangeType()}
				account={this.props.context.account}
			>
				<button onClick={this.onGoBackBtn} className="btn-hover dark">
					{dictionary.app.backBtnTxt}
				</button>
			</ExchangeForm>
		)
	}
}

export { Exchange };

export default (props) => (
	<AccountContext.Consumer>
		{context => <Exchange context={context} {...props}/>}
	</AccountContext.Consumer>
);