import React from 'react';
import dictionary from '../../shared/dictionary/dictionary';
import { AccountContext } from '../../shared/service/web3/web3.service';

class TransactionInProgress extends React.Component {

	componentDidUpdate(prevProps) {
		if(!prevProps.context.event && this.props.context.event) {
			this.props.history.push({
				pathname: `/exchange/complete/${this.getTransactionHash()}`,
				event: this.props.context.event
			});
			this.props.context.clearEvent();
		}
	}

	getTransactionHash = () => {
		return this.props.match.params.transactionHash;
	};

	getTransactionLink = () => {
		return `${dictionary.transactionInProgress.transactionLink(this.getTransactionHash())}`
	};

	render() {
		return (
			<div className="mx-5" style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
				<h5 className="mt-5">
					{dictionary.transactionInProgress.inProgressLabel}
				</h5>
				<a href={this.getTransactionLink()} target={"_blank"}>
					<button className="btn-hover main">
						{dictionary.transactionInProgress.transactionLinkLabel}
					</button>
				</a>
			</div>
		)
	}
}

export { TransactionInProgress };

export default (props) => (
	<AccountContext.Consumer>
		{context => <TransactionInProgress context={context} {...props}/>}
	</AccountContext.Consumer>
);