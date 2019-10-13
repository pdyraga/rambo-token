import React from 'react';
import { shallow } from 'enzyme/build/index';
import MetaMaskNotFound from '../../../../shared/components/not-found/MetaMaskNotFound';
import dictionary from '../../../../shared/dictionary/dictionary';

describe('Loadable component test', () =>  {

	test('should render spinner when fetching', () => {
		const errorMessage = 'error';
		const wrapper = shallow(<MetaMaskNotFound errorMessage={errorMessage} />);

		expect(wrapper.find('div')).toHaveLength(2);
		expect(wrapper.find('div').first().props().className).toBe('metamask-not-found-wrapper');
		const h5Tag = wrapper.find('div').first().find('h5');
		expect(h5Tag.props().className).toBe('font-weight-bold mx-5');
		expect(h5Tag.contains(errorMessage))
			.toBeTruthy();
		expect(wrapper.find('#metamask-img')).toHaveLength(1);

	});
});