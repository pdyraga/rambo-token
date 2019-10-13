import React from 'react';
import { shallow } from 'enzyme';
import dictionary from '../../../../shared/dictionary/dictionary';
import Header from '../../../../shared/components/header/Header';
import { Link } from 'react-router-dom';

describe('Header component test', () =>  {

	test('should render correctly', () => {
		const wrapper = shallow(<Header />);

		const navTag = wrapper.find('nav');
		expect(navTag).toHaveLength(1);
		expect(navTag.props().className).toBe('navbar navbar-expand-lg navbar-light bg-light');

		const linkComponent = wrapper.find(Link);
		expect(linkComponent).toHaveLength(1);
		expect(linkComponent.props().className).toBe('navbar-brand');
		expect(linkComponent.props().to).toBe('/');
		expect(linkComponent.contains(dictionary.header.title)).toBeTruthy();
	});
});