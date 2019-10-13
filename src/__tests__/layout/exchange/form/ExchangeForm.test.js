import React from 'react';
import { shallow } from 'enzyme';
import ExchangeForm from '../../../../layout/exchange/form/ExchangeForm';
import Loadable from '../../../../shared/components/loadable/Loadable';
import dictionary from '../../../../shared/dictionary/dictionary';
import validators from '../../../../../src/layout/exchange/form/validators';

describe('ExchangeForm component test', () => {

	let wrapper;
	const mockProps = {
		exchangeType: 'buy',
		onSubmit: jest.fn(),
		account: 'account',
	};

	beforeEach(() => {
		wrapper = shallow(<ExchangeForm {...mockProps} />);
	});

	test('should render correctly', () => {
		const loadableComponent = wrapper.find(Loadable);
		expect(loadableComponent).toHaveLength(1);
		expect(loadableComponent.props().isFetching).toBe(wrapper.instance().state.isFetching);

		const formWrapper = wrapper.find('form');

		const input = formWrapper.find('input');
		expect(input).toHaveLength(1);
		expect(input.props().className).toBe('rounded-input mt-5');
		expect(input.props().type).toBe('number');
		expect(input.props().onChange).toBe(wrapper.instance().onValueChange);
		expect(input.props().min).toBe(0);

		const submitBtn = formWrapper.find('button');
		expect(submitBtn).toHaveLength(1);
		expect(submitBtn.props().onClick).toBe(wrapper.instance().onSubmit);
		expect(submitBtn.props().className).toBe("btn-hover success my-5");
		expect(submitBtn.contains(dictionary.exchangeForm.submitBtnTxt)).toBeTruthy();
	});

	test('should display validation message if exists', () => {
		wrapper.setState({ validationMessage: 'message' });
		const pTag = wrapper.find('p');

		expect(pTag).toHaveLength(1);
		expect(pTag.props().className).toBe("mt-2 mb-5");
		expect(pTag.contains(wrapper.instance().state.validationMessage)).toBeTruthy();
	});

	test('should set state when value change', () => {
		expect(wrapper.instance().state.amount).toBe(0);
		const mockEvent = { target: { value: 20 }};
		wrapper.instance().onValueChange(mockEvent);
		expect(wrapper.instance().state.amount).toBe(mockEvent.target.value);
	});

	test('should catch error when validate method throw error', () => {
		const validationMessage = 'error message'
		const validationResponse = Promise.reject(validationMessage);
		validators.validate = jest.fn().mockReturnValue(validationResponse);
		const mockEvent = { preventDefault: jest.fn() };
		wrapper.instance().onSubmit(mockEvent);
		expect(mockEvent.preventDefault).toHaveBeenCalled();

		expect(validators.validate).toHaveBeenCalledWith(wrapper.instance().state.amount, wrapper.instance().props);
		return validationResponse
			.then(() => {})
			.catch(message => {
				expect(wrapper.instance().state.validationMessage).toBe(validationMessage);
			})
	});

	test('should call on submit props method if form is valid', () => {
		const validationResponse = Promise.resolve({});
		validators.validate = jest.fn().mockReturnValue(validationResponse);
		const mockEvent = { preventDefault: jest.fn() };
		wrapper.instance().onSubmit(mockEvent);
		expect(mockEvent.preventDefault).toHaveBeenCalled();

		expect(validators.validate).toHaveBeenCalledWith(wrapper.instance().state.amount, wrapper.instance().props);
		return validationResponse
			.then(() => {
				expect(wrapper.instance().props.onSubmit)
					.toHaveBeenCalledWith(wrapper.instance().state.amount, wrapper.instance().onSubmitErrorCallback)
				expect(wrapper.instance().state.validationMessage).toBe('');
			})
	});

	test('should set new state when call on submit error callback', () => {
		wrapper.setState({ isFetching: true });
		expect(wrapper.instance().state.isFetching).toBe(true);
		wrapper.instance().onSubmitErrorCallback();
		expect(wrapper.instance().state.isFetching).toBe(false);
	});

	test('should set new state when call catch submit error', () => {
		expect(wrapper.instance().state.validationMessage).toBe('');
		wrapper.setState({ isFetching: true });
		expect(wrapper.instance().state.isFetching).toBe(true);
		const mockValidationMsg = 'error';
		wrapper.instance().catchSubmitError(mockValidationMsg);
		expect(wrapper.instance().state.validationMessage).toBe(mockValidationMsg);
		expect(wrapper.instance().state.isFetching).toBe(false);
	});
});