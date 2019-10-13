import React from 'react';
import dictionary from '../../../shared/dictionary/dictionary';
import Loadable from '../../../shared/components/loadable/Loadable';
import validators from './validators';

export default class ExchangeForm extends React.Component {

	constructor(props){
		super(props);
		this.state = { amount: 0, validationMessage: '', isFetching: false }
	}

	onValueChange = (event) => {
		this.setState({ amount: event.target.value })
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.setState({ isFetching : true });
		validators.validate(this.state.amount, this.props)
			.then(this.submit)
			.catch(this.catchSubmitError);
	};

	submit = () => {
		this.props.onSubmit(this.state.amount, this.onSubmitErrorCallback)
	};

	onSubmitErrorCallback = () => {
		this.setState({ isFetching: false })
	};

	catchSubmitError = (validationMessage) => {
		this.setState({ validationMessage, isFetching: false })
	};

	render() {
		return(
			<Loadable isFetching={this.state.isFetching} >
				<form className="mx-4 mx-md-0" style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', height: '100%'}}>
					<input
						className="rounded-input mt-5"
						placeholder={dictionary.exchangeForm.inputPlaceholder}
						type="number"
						onChange={this.onValueChange}
						min={0}
					/>
					<p className="mt-2 mb-5">
						{this.state.validationMessage}
					</p>
					<button onClick={this.onSubmit} className="btn-hover success my-5">
							{dictionary.exchangeForm.submitBtnTxt}
					</button>
					{this.props.children}
				</form>
			</Loadable>
		)
	}
}