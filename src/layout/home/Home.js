import React from 'react';
import './home.css';
import dictionary from '../../shared/dictionary/dictionary';

export default class Home extends React.Component {

	navigateToExchangePage = (type, event) => {
		return event => {
			this.props.history.push(`/exchange/${type}`);
		}
	};

	render(){

		return (
			<div className="home-buttons">
				<button onClick={this.navigateToExchangePage('buy')} className="btn-hover main">
					{dictionary.homePage.buyButtonTxt}
				</button>
				<button onClick={this.navigateToExchangePage('sell')} className="btn-hover main">
					{dictionary.homePage.sellButtonTxt}
				</button>
			</div>
		)
	}
}