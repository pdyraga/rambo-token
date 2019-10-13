import React from 'react';
import dictionary from '../../dictionary/dictionary';
import { AccountContext } from '../../service/web3/web3.service';

class AccountInfo extends React.Component {

	render(){
		const { context: { account, ethBalance, ramboBalance } } = this.props;
		return(
			<div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', marginTop: 10 }}>
				<div className="card box-shadow card-hover">
						<div className="card-body">
							<h4 className="card-title text-center font-weight-bold">{dictionary.accountInfo.accountLabel}</h4>
							<h6 className="card-subtitle mb-2 text-muted">{account}</h6>
							<br/>
							<p className="card-title text-muted">
								{dictionary.accountInfo.ethBalanceLabel}
								<span className="text-dark font-weight-bold">
									{ethBalance}
								</span>
							</p>
							<p className="card-title text-muted">
								{dictionary.accountInfo.ramboBalanceLabel}
								<span className="text-dark font-weight-bold">
									{ramboBalance}
								</span>
							</p>
						</div>
				</div>
			</div>
		)
		}
}

export { AccountInfo };

export default () => (
	<AccountContext.Consumer>
		{context => <AccountInfo context={context}/>}
	</AccountContext.Consumer>
);