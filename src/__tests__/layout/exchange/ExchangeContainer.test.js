import React from 'react';
import { shallow } from 'enzyme';
import { Redirect, Route, Switch } from "react-router-dom";
import Exchange from '../../../layout/exchange/Exchange';
import TransactionInProgress from '../../../layout/exchange/TransactionInProgress';
import TransactionComplete from '../../../layout/exchange/TransactionComplete';
import ExchangeContainer from '../../../layout/exchange/ExchangeContainer';

describe('ExchangeContainer component test', () => {

	test('should render correctly', () => {
		const wrapper = shallow(<ExchangeContainer />);

		expect(wrapper.find(Switch)).toHaveLength(1);
		expect(wrapper.contains(<Route exact path='/exchange/:type' component={Exchange}/>))
			.toBeTruthy();
		expect(wrapper.contains(<Route exact path='/exchange/in-progress/:transactionHash' component={TransactionInProgress}/>))
			.toBeTruthy();
		expect(wrapper.contains(<Route exact path='/exchange/complete/:transactionHash' component={TransactionComplete}/>))
			.toBeTruthy();
		expect(wrapper.contains(<Redirect to={'/exchange/buy'}/>))
			.toBeTruthy();

	});
});