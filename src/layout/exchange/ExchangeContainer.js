import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Exchange from './Exchange';
import TransactionInProgress from './TransactionInProgress';
import TransactionComplete from './TransactionComplete';

export default class ExchangeContainer extends React.Component {

	render() {
		return (
			<Switch>
				<Route exact path='/exchange/:type' component={Exchange}/>
				<Route exact path='/exchange/in-progress/:transactionHash' component={TransactionInProgress}/>
				<Route exact path='/exchange/complete/:transactionHash' component={TransactionComplete}/>
				<Redirect to={'/exchange/buy'}/>
			</Switch>
		)
	}
}