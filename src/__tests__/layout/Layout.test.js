import React from 'react';
import { shallow } from 'enzyme';
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from '../../layout/Layout';
import ExchangeContainer from '../../layout/exchange/ExchangeContainer';
import Home from '../../layout/home/Home';
import AccountInfo from '../../shared/components/user/AccountInfo';

describe('Layout component test', () => {

	test('should render correctly', () => {
		const wrapper = shallow(<Layout />);
		expect(wrapper.find(AccountInfo)).toHaveLength(1);
		expect(wrapper.find(Switch)).toHaveLength(1);
		expect(wrapper.contains(<Route path='/exchange' component={ExchangeContainer}/>))
			.toBeTruthy();
		expect(wrapper.contains(<Route path='/' component={Home}/>))
			.toBeTruthy();
	});
});