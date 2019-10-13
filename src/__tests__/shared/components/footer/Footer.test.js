import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../shared/components/footer/Footer';
import dictionary from '../../../../shared/dictionary/dictionary';

describe('Footer component test', () =>  {

	test('should render correctly', () => {
		const wrapper = shallow(<Footer />);

		expect(wrapper.find('footer')).toHaveLength(1);
		expect(wrapper.find('footer').contains(dictionary.footer.footerTxt)).toBeTruthy();
	});
});