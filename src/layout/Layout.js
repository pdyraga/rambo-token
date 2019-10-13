import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './home/Home';
import AccountInfo from '../shared/components/user/AccountInfo';
import ExchangeContainer from './exchange/ExchangeContainer';

export default class Layout extends React.Component {

	render() {
		return (
			<div className="main-content">
				<AccountInfo />
				<Switch>
					<Route path="/exchange" component={ExchangeContainer} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}
