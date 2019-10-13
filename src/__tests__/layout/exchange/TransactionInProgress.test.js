import React from 'react';
import { shallow } from 'enzyme/build/index';
import dictionary from '../../../shared/dictionary/dictionary';
import { TransactionInProgress } from '../../../layout/exchange/TransactionInProgress';

describe('TransactionInProgress component test', () => {

	let wrapper;

	const contextMock = {
		clearEvent: jest.fn(),
		event: { name: 'mock' },
	};

	const transactionHash = 'hash';

	const mockProps = {
		context: { ...contextMock },
		history: {
			push: jest.fn()
		},
		match: {
			params: {
				transactionHash: transactionHash
			}
		}
	};

	beforeEach(() => {
		wrapper = shallow(<TransactionInProgress {...mockProps}/>);
	});

	test('should render correctly', () => {
		const linkComponent = wrapper.find('a');
		expect(linkComponent).toHaveLength(1);
		expect(linkComponent.props().href).toBe(dictionary.transactionInProgress.transactionLink(transactionHash));
		expect(linkComponent.props().target).toBe('_blank');
		expect(linkComponent.find('button')).toHaveLength(1);
		expect(linkComponent.find('button').props().className).toBe('btn-hover main');
		expect(linkComponent.find('button')).toHaveLength(1);
		expect(linkComponent.find('button').contains(dictionary.transactionInProgress.transactionLinkLabel))
			.toBeTruthy();

		const h5Tag = wrapper.find('h5');
		expect(h5Tag).toHaveLength(1);
		expect(h5Tag.contains(dictionary.transactionInProgress.inProgressLabel)).toBeTruthy();
	});

	test('should return right transaction hash', () => {
		const result = wrapper.instance().getTransactionHash();
		expect(result).toBe(transactionHash);
	});

	test('should return right transaction link', () => {
		const result = wrapper.instance().getTransactionLink();
		expect(result).toBe(dictionary.transactionInProgress.transactionLink(transactionHash));
	});

});