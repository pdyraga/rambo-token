import React from 'react';
import './meta-mask-not-found.css';

const MetaMaskNotFound = (props) => (
	<div className="metamask-not-found-wrapper">
		<div>
			<img id="metamask-img" src={require('../../../assets/metamask.png')} />
		</div>
		<h5 className="font-weight-bold mx-5">
			{props.errorMessage}
		</h5>
	</div>
);

export default MetaMaskNotFound;