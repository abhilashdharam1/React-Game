import React, {Component} from 'react';

class QuizOptions extends Component {
	constructor(props) {
		super(props);
		this.callParentOptions = this.callParentOptions.bind(this);
	}

	callParentOptions() {
		this.props.checkResults(this.props.option);
	}
	render() {
		return(
			<div className="fields animated zoomIn" onClick={this.callParentOptions}>
				<div className="field-block">{this.props.option}</div>
			</div>
			);
	}
}

export default QuizOptions;