import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import Header from './shared/components/header/Header';
import Footer from './shared/components/footer/Footer';
import Web3 from 'web3';
import web3Service, { AccountContext } from './shared/service/web3/web3.service';
import dictionary from './shared/dictionary/dictionary';
import MetaMaskNotFound from './shared/components/not-found/MetaMaskNotFound';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			account: null,
			isFetching: true,
			errorMessage: dictionary.app.pleaseLoginTxt,
			event: null,
			clearEvent: this.clearEvent,
			ethBalance: 0,
			ramboBalance: 0
		};
	}

	componentDidMount(){
		this.onComponentDidMount();
	}

	onComponentDidMount = () => {
		if(Web3.givenProvider) {
			this.getAccounts();
			this.subscribeEvents();
		} else {
			this.setState({ errorMessage: dictionary.app.metaMaskNotFound });
		}
	};

	getAccounts = () => {
		web3Service.getAccounts()
			.then(this.tryConnectToProvider)
			.then(this.getBalance)
			.catch(this.catchError);
	};

	tryConnectToProvider = accounts => {
		if(accounts.length === 0){
			return window.ethereum.enable()
				.then(this.setAccounts)
				.catch(error => Promise.reject(dictionary.app.cantConnectToMetaMask));
		}
		return this.setAccounts(accounts);
	};

	setAccounts = accounts => {
		const account = accounts[0];
		this.setState({ account, isFetching: false });
		return account;
	};

	subscribeEvents = () => {
		web3Service.getMarketContract().once('TokenBought',{}, this.onEvent);
		web3Service.getMarketContract().once('TokenSold',{}, this.onEvent);
	};

	catchError = (error) => {
		this.setState({ isFetching: false, errorMessage: error });
	};

	onEvent = (error, event) => {
		this.getBalance(this.state.account).catch(this.catchError);
		this.setState({ event })
	};

	getBalance = (account) => {
		return Promise.all([web3Service.getAccountBalance(account), web3Service.getTokenContract().methods.balanceOf(account).call()])
			.then(([ethBalance, ramboBalance]) => this.setState({ ethBalance, ramboBalance, isFetching: false }))
	};

	clearEvent = () => {
		this.setState( { event: null })
	};

	render() {
		const { isFetching, account } = this.state;

		return (
			<Router>
				{(!isFetching && account) ?
					<AccountContext.Provider value={this.state}>
						<div className="main-content-wrapper">
							<Header/>
							<Layout/>
							<Footer/>
						</div>
					</AccountContext.Provider>
					:
					<MetaMaskNotFound errorMessage={this.state.errorMessage} />
				}
			</Router>
		);
	}
}

App.contextType = AccountContext;
export default App;
