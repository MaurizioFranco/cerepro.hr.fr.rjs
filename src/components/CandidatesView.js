import React, { Component } from 'react';
import CentralPanel from './candidates/CentralPanel';

	class CandidatesView extends Component {
		
		constructor (props) {
			super(props);
			console.log("CandidatesView.constructor() - START");
			const { match: { params } } = this.props;
			console.log("CandidatesView.constructor() - DEBUG - Selected params.id:" + params.id);
//			if (params.id!=undefined) {
//				this.state = {
//						position_code : ''
//				}
//				this.setState({position_code: params.id});
			this.state = {
					position_code : params.id
			}
				console.log("CandidatesView.constructor() - DEBUG - Selected position_code:" + this.state.position_code);
//			}
			console.log("CandidatesView.constructor() - END");
		}
		componentDidMount() {
		    console.log("CandidatesView.componentDidMount() - START");
			const { match: { params } } = this.props;
			console.log("CandidatesView.componentDidMount() - DEBUG - Selected params.id:" + params.id);
//			if (params.id!=undefined) {
//				this.state = {
//						position_code : params.id
//				}
			    this.setState({position_code: params.id});
				console.log("CandidatesView.componentDidMount() - DEBUG - selected position_code:" + this.state.position_code);
//			}
			console.log("CandidatesView.componentDidMount() - END");
		}
		render() {
			return (
				<div>
				    <CentralPanel positionCode={this.state.position_code}/>
				</div>
			);
		}
	}
	export default CandidatesView;