import React from 'react';
import { shallow } from 'enzyme';
import { AccountInfo } from '../../../../shared/components/user/AccountInfo';
import dictionary from '../../../../shared/dictionary/dictionary';

describe('AccountInfo component test', () => {

	let wrapper;
	const mockProps = {
		context: {
			account: 'account',
			ethBalance: 1,
			ramboBalance: 2,
		}
	};

	beforeEach(() => {
		wrapper = shallow(<AccountInfo {...mockProps} />);
	});

	test('should render correctly', () => {
		expect(wrapper.find('p')).toHaveLength(2);
		const ethBalance = wrapper.find('p').first();
		const ramboBalance = wrapper.find('p').at(1);
		const account = wrapper.find('h6').first();

		expect(account.props().className).toBe('card-subtitle mb-2 text-muted');
		expect(account.contains(wrapper.instance().props.context.account)).toBeTruthy();
		checkBalanceExpectations(ethBalance, 'ethBalance');
		checkBalanceExpectations(ramboBalance, 'ramboBalance');
	});

	const checkBalanceExpectations = (pTagWrapper, currency) => {
		expect(pTagWrapper.contains(dictionary.accountInfo.ethBalanceLabel));
		expect(pTagWrapper.props().className).toBe("card-title text-muted");
		expect(pTagWrapper.find('span')).toHaveLength(1);
		expect(pTagWrapper.find('span').first().props().className).toBe("text-dark font-weight-bold");
		expect(pTagWrapper.find('span').first().contains(wrapper.instance().props.context[currency])).toBeTruthy();
	}
});