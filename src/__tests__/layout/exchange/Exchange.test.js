import React from 'react';
import { shallow } from 'enzyme';
import { Exchange } from '../../../layout/exchange/Exchange';
import ExchangeForm from '../../../layout/exchange/form/ExchangeForm';
import dictionary from '../../../shared/dictionary/dictionary';
import web3Service from '../../../shared/service/web3/web3.service';
import { MARKET_CONTRACT_ADDRESS } from '../../../config/contracts/market-contract.config';

describe('AccountInfo component test', () => {

	let wrapper;
	const mockProps = {
		history: {
			push: jest.fn(),
			goBack: jest.fn(),
		},
		match: {
			params: {
				type: 'sell',
			},
		},
		context: {
			account: 'account',
			ethBalance: 1,
			ramboBalance: 2,
		}
	};

	beforeEach(() => {
		wrapper = shallow(<Exchange {...mockProps} />);
	});

	test('should render correctly', () => {
		const exchangeFormComponent = wrapper.find(ExchangeForm).first();

		expect(exchangeFormComponent.props().onSubmit).toBe(wrapper.instance().onSubmit);
		expect(exchangeFormComponent.props().exchangeType).toBe(wrapper.instance().getExchangeType());
		expect(exchangeFormComponent.props().account).toBe(wrapper.instance().props.context.account);

		const goBackBtn = exchangeFormComponent.find('button').first();
		expect(goBackBtn.props().onClick).toBe(wrapper.instance().onGoBackBtn);
		expect(goBackBtn.props().className).toBe("btn-hover dark");
		expect(goBackBtn.contains(dictionary.app.backBtnTxt)).toBeTruthy();
	});

	test('should return right exchange type from props', () => {
		expect(wrapper.instance().getExchangeType()).toBe(wrapper.instance().props.match.params.type);
	});

	test('should call go back method from history props when click on button', () => {
		const goBackBtn = wrapper.find('button').first();
		goBackBtn.simulate('click');

		expect(wrapper.instance().props.history.goBack).toHaveBeenCalled()
	});

	test('should call push method from history props when call navigate to in progress page', () => {
		const mockHash = 'hash';
		wrapper.instance().navigateToInProgressPage(mockHash);

		expect(wrapper.instance().props.history.push).toHaveBeenCalledWith(`/exchange/in-progress/${mockHash}`)
	});

	test('should call sell flow when exchange type is sell in on submit method', () => {
		const approveResponse = Promise.resolve("approve");
		const sellResponse = Promise.resolve();
		const value = 1;
		const errorCallbackMock = jest.fn();

		wrapper.instance().salesApprovalRequest = jest.fn().mockReturnValue(approveResponse);
		wrapper.instance().sell = jest.fn().mockReturnValue(sellResponse);
		wrapper.update();
		wrapper.instance().onSubmit(value, errorCallbackMock);

		expect(wrapper.instance().salesApprovalRequest).toHaveBeenCalledWith(value);
		return approveResponse.then(approve => {
			expect(wrapper.instance().sell).toHaveBeenCalledWith(approve, value);
		});
	});

	test('should call error callback in sell flow if catch error', () => {
		const validationMessageMock = { message: 'error' };
		const approveResponse = Promise.reject(validationMessageMock);
		const value = 1;
		const errorCallbackMock = jest.fn();

		wrapper.instance().salesApprovalRequest = jest.fn().mockReturnValue(approveResponse);

		wrapper.update();
		wrapper.instance().onSubmit(value, errorCallbackMock);

		expect(wrapper.instance().salesApprovalRequest).toHaveBeenCalledWith(value);
		return approveResponse.then(() => {})
			.catch(error => {
				expect(errorCallbackMock).toHaveBeenCalledWith(error.message);
			});
	});

	test('should call buy flow ', () => {
		const contractMock = {
			methods: {
				buy: jest.fn().mockReturnValue({ send: jest.fn().mockReturnValue({ on: jest.fn().mockReturnValue({ on: jest.fn() })}) })
			}
		};
		const value = 1;
		const errorCallbackMock = jest.fn();
		web3Service.getMarketContract = jest.fn().mockReturnValue(contractMock);
		wrapper.setProps({ match: {
				params: {
					type: 'buy',
				},
			}, });

		wrapper.instance().onSubmit(value, errorCallbackMock);

		expect(web3Service.getMarketContract).toHaveBeenCalled();
		expect(contractMock.methods.buy).toHaveBeenCalled();
		expect(contractMock.methods.buy().send).toHaveBeenCalledWith({ from: wrapper.instance().props.context.account, value: value.toString() });
		expect(contractMock.methods.buy().send().on).toHaveBeenCalledWith('transactionHash', wrapper.instance().navigateToInProgressPage);
		expect(contractMock.methods.buy().send().on().on)
			.toHaveBeenCalledWith('error', expect.any(Function));
	});

	test('should call methods from token contract when call sales approval request', () => {
		const tokenContractMock = {
			methods: {
				approve: jest.fn().mockReturnValue({ send: jest.fn() }),
			},
		};
		const mockValue = 1;
		web3Service.getTokenContract = jest.fn().mockReturnValue(tokenContractMock);

		wrapper.instance().salesApprovalRequest(mockValue);

		expect(web3Service.getTokenContract).toHaveBeenCalled();
		expect(tokenContractMock.methods.approve).toHaveBeenCalledWith(MARKET_CONTRACT_ADDRESS, mockValue.toString());
		expect(tokenContractMock.methods.approve().send).toHaveBeenCalledWith({ from: wrapper.instance().props.context.account });
	});

	test('should call right methods from market contract when call sell request', () => {
		const marketContractMock = {
			methods: {
				sell: jest.fn().mockReturnValue({ send: jest.fn().mockReturnValue({ on: jest.fn().mockReturnValue({ on: jest.fn() }) }) }),
			},
		};
		const mockApprove = 'tx';
		const mockValue = 1;
		web3Service.getMarketContract = jest.fn().mockReturnValue(marketContractMock);

		wrapper.instance().sell(mockApprove, mockValue);

		expect(web3Service.getMarketContract).toHaveBeenCalled();
		expect(marketContractMock.methods.sell).toHaveBeenCalledWith(mockValue.toString(), wrapper.instance().props.context.account);
		expect(marketContractMock.methods.sell().send).toHaveBeenCalledWith({ from: wrapper.instance().props.context.account});
		expect(marketContractMock.methods.sell().send().on).toHaveBeenCalledWith('transactionHash', wrapper.instance().navigateToInProgressPage);
	});

});