import React from 'react';
import { shallow } from 'enzyme/build/index';
import Home from '../../../layout/home/Home';

describe('Home component test', () => {

	let wrapper;
	const mockProps = {
		history: {
			push: jest.fn(),
		}
	};

	beforeEach(() => {
		wrapper = shallow(<Home {...mockProps}/>);
	});

	test('should render correctly', () => {
		const buttonsWrapper = wrapper.find('.home-buttons');
		expect(buttonsWrapper).toHaveLength(1);
		expect(buttonsWrapper.find('button')).toHaveLength(2);
	});

	test('should call history push method when press button', () => {
		const buttonsWrapper = wrapper.find('.home-buttons');
		const buyButton = buttonsWrapper.find('button').first();
		const sellButton = buttonsWrapper.find('button').at(1);

		buyButton.simulate('click');
		expect(mockProps.history.push).toHaveBeenCalledWith('/exchange/buy');

		sellButton.simulate('click');
		expect(mockProps.history.push).toHaveBeenCalledWith('/exchange/sell');
	})
});