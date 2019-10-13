import React from 'react';
import { shallow } from 'enzyme/build/index';
import TransactionComplete from '../../../layout/exchange/TransactionComplete';
import { Link } from 'react-router-dom';
import dictionary from '../../../shared/dictionary/dictionary';

describe('TransactionComplete component test', () => {

	let wrapper;
	const eventName = 'TokenBought';
	const amount = 100;
	const mockProps = {
		history: {
			location: {
				event: {
					returnValues: {
						amount: amount,
					},
					event: eventName
				}
			},
		}
	};

	beforeEach(() => {
		wrapper = shallow(<TransactionComplete {...mockProps}/>);
	});

	test('should render correctly', () => {
		const linkComponent = wrapper.find(Link);
		expect(linkComponent).toHaveLength(1);
		expect(linkComponent.props().to).toBe('/');
		expect(linkComponent.find('button')).toHaveLength(1);
		expect(linkComponent.find('button').props().className).toBe('btn-hover main');
		expect(linkComponent.find('button')).toHaveLength(1);
		expect(linkComponent.find('button').contains(dictionary.transactionComplete.backBtnTxt))
			.toBeTruthy();

		const h5Tag = wrapper.find('h5');
		const expectedh5Content = dictionary.transactionComplete
			.amountLabel(amount, dictionary.app.weiLabel);
		expect(h5Tag).toHaveLength(1);
		expect(h5Tag.contains(expectedh5Content)).toBeTruthy();
	});

	test('should return correct currency name depends on event', () => {
		const result = wrapper.instance().getCurrencyName();
		expect(result).toBe(dictionary.app.weiLabel);

		wrapper.setProps({
			history: {
				location: {
					event: {
						returnValues: {
							amount: 100,
						},
						event: 'TokenSell'
					}
				},
			}
		});
		const result2 = wrapper.instance().getCurrencyName();
		expect(result2).toBe(dictionary.app.ramboTokenLabel);
	});

	test('should return correct transacion info', () => {
		const result = wrapper.instance().getTransactionInfo();
		expect(result).toBe(mockProps.history.location.event.returnValues.amount)

	});
});