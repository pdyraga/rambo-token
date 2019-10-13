import React from 'react';
import dictionary from '../../dictionary/dictionary';
import { Link } from 'react-router-dom';

export default () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<Link className="navbar-brand" to={"/"}>
			{dictionary.header.title}
		</Link>
	</nav>
)