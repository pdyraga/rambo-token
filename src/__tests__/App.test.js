import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import dictionary from '../shared/dictionary/dictionary';
import Web3 from 'web3';
import web3Service from '../shared/service/web3/web3.service';

describe('App component test', () => {

	let wrapper;
	let ethBalanceResponse;
	let ramboBalanceResponse;

	beforeEach(() => {
		jest.mock('web3');
		Web3.givenProvider = 'address';
		ethBalanceResponse = Promise.resolve(1);
		ramboBalanceResponse = Promise.resolve(2);
		web3Service.getAccountBalance = jest.fn().mockReturnValue(ethBalanceResponse);
		web3Service.getTokenContract = jest.fn().mockReturnValue({ methods: { balanceOf: jest.fn().mockReturnValue({ call: jest.fn().mockReturnValue(ramboBalanceResponse)})}});
		wrapper = shallow(<App />);
	});

	test('should set error message when web3 provider is null', () => {
		jest.mock('web3', () => ({ givenProvider: null }));
		Web3.givenProvider = null;
		wrapper.instance().onComponentDidMount();

		expect(wrapper.instance().state.errorMessage).toBe(dictionary.app.metaMaskNotFound);
	});

	test('should get accounts and subscribe to events when web3 provider is present', () => {
		wrapper.instance().getAccounts = jest.fn();
		wrapper.instance().subscribeEvents = jest.fn();
		wrapper.update();

		wrapper.instance().onComponentDidMount();

		expect(wrapper.instance().getAccounts).toHaveBeenCalled();
		expect(wrapper.instance().subscribeEvents).toHaveBeenCalled();
	});

	test('should try connect to provider', () => {
		const accountsMock = [1];

		wrapper.setState({ account: null, isFetching: true });
		wrapper.instance().getAccounts = jest.fn();

		wrapper.instance().tryConnectToProvider(accountsMock);
		const result = wrapper.instance().setAccounts(accountsMock);

		expect(result).toBe(accountsMock[0]);
		expect(wrapper.instance().state.account).toBe(accountsMock[0]);
		expect(wrapper.instance().state.isFetching).toBeFalsy();
	});

	test('should subscribe to contract events when call subscribe event method', () => {

		const mockContract = { once: jest.fn() };
		web3Service.getMarketContract = jest.fn().mockReturnValue(mockContract);

		wrapper.instance().subscribeEvents();

		expect(web3Service.getMarketContract).toHaveBeenCalled();
		expect(mockContract.once).toHaveBeenCalledWith('TokenBought', {}, wrapper.instance().onEvent);
		expect(mockContract.once).toHaveBeenCalledWith('TokenSold', {}, wrapper.instance().onEvent);
	});

	test('should set event in state when on event method have been called', () => {
		const mockEvent = { event: 'eventName' };

		wrapper.instance().onEvent(null, mockEvent);

		expect(wrapper.instance().state.event).toBe(mockEvent);
		return Promise.all([ethBalanceResponse, ramboBalanceResponse])
			.then(([eth, rambo]) => {
				expect(wrapper.instance().state.ethBalance).toBe(eth);
				expect(wrapper.instance().state.ramboBalance).toBe(rambo);
				expect(wrapper.instance().state.isFetching).toBe(false);
			});
	});

	test('should correctly clear event', () => {
		wrapper.setState({ event: { name: 'mockEvent' }});

		wrapper.instance().clearEvent();

		expect(wrapper.instance().state.event).toBe(null);
	});

	test('should correctly catch error', () => {
		const mockErrorMsg = 'error';
		wrapper.setState({ isFetching: true });

		wrapper.instance().catchError(mockErrorMsg);

		expect(wrapper.instance().state.errorMessage).toBe(mockErrorMsg);
		expect(wrapper.instance().state.isFetching).toBeFalsy();
	});

	test('should call window ethereum enable if accounts is empty', () => {
		const mockResponse = Promise.resolve([0]);
		delete global.window;
		global.window = { ethereum: { enable: jest.fn().mockReturnValue(mockResponse)}};

		wrapper.instance().tryConnectToProvider([]);

		expect(window.ethereum.enable).toHaveBeenCalled();
		wrapper.setState({ account: null });
		return mockResponse.then((accounts) => {
			expect(wrapper.instance().state.account).toBe(accounts[0]);
		});
	});

});