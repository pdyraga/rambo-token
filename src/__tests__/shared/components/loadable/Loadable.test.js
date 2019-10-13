import React from 'react';
import { shallow } from 'enzyme/build/index';
import Loadable from '../../../../shared/components/loadable/Loadable';

describe('Loadable component test', () =>  {

	test('should render spinner when fetching', () => {
		const wrapper = shallow(<Loadable isFetching={true} />);

		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('div').props().id).toBe('loader')
	});

	test('should render children when not fetching', () => {
		const wrapper = shallow(<Loadable isFetching={false} children={<div id='some-content'/>} />);

		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('div').props().id).toBe('some-content')
	});
});