import React, { Component } from 'react';
import './CandidateUpdateForm.css';
import * as Constants from '../../../constants';
import * as Commons from '../../../commons.js';
import CandidateUpdateFormPositionCodeSelect from './CandidateUpdateFormPositionCodeSelect.js';
import CandidateProfileCVDownloadImage from '../CandidateProfileCVDownloadImage.js';
import Select from 'react-select';
import CandidateProfileImage from '../CandidateProfileImage.js';
import { withRouter } from 'react-router-dom'
import EditButton from "../../../commons/EditButton.js";
import SaveButton from "../../../commons/SaveButton.js";
import CancelButton from "../../../commons/CancelButton.js";
import styles from "../../../styles.js";

import {
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Checkbox,
	FormControlLabel
} from "@material-ui/core";

class CandidateUpdateForm extends Component {

	componentDidMount() {
		Commons.debugMessage("CandidateUpdateForm.componentDidMount - START");
		this.fetchUserDetail();
		this.fetchCandidateStates();
	}

	constructor(props) {
		super(props);
		const { match: { params } } = props;
		Commons.debugMessage("constructor - DEBUG - id: " + params.id);
		// this.goBack = this.goBack.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleCandidatesStatesChange = this.handleCandidatesStatesChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			candidate: this.props.candidate,
			currentCandidateId: params.id,
			courseCodes: [],
			id: '',
			firstname: '',
			lastname: '',
			email: '',
			courseCode: '',
			oldCV: '',
			oldImg: '',
			domicileCity: '',
			studyQualification: '',
			graduate: false,
			highGraduate: false,
			stillHighStudy: false,
			mobile: '',
			birthdate: '',
			note: '',
			candidateStatusCode: '',

			redirect: false,
			candidateStates: [{ label: "aaa 100", value: 100 }, { label: "bbb 200", value: 200 }]
		}
		this.gridRef = React.createRef();
		this.loggedUserId = Commons.getUserLoggedId();
	}

	fetchCandidateStates = () => {
		Commons.executeFetch(Constants.FULL_CANDIDATE_STATES_API_URI, 'GET', this.setCandidateStates);
	}

	setCandidateStates = (responseData) => {
		let newOptions = [];
		for (let currOpt of responseData) {
			newOptions.push({ label: currOpt.statusLabel, value: currOpt.statusCode });
		}
		this.setState({ candidateStates: newOptions });
	}

	fetchCourseCodes = () => {
		Commons.executeFetch(Constants.FULL_COURSEPAGE_API_URI, 'GET', this.setCourseCodes);
	}

	fetchUserDetail = () => {
		Commons.debugMessage("CandidateUpdateForm.fetchUserDetail - DEBUG - id: " + this.state.currentCandidateId);
		Commons.executeFetch(Constants.FULL_CANDIDATE_CUSTOM_API_URI + this.state.candidate, 'GET', this.setCurrentCandidate);
	}

	setCurrentCandidate = (responseData) => {
		Commons.debugMessage("CandidateUpdateForm.setCurrentCandidate - START - destructuring");
		let { id, firstname, lastname, email, courseCode, imgpath, cvExternalPath,
			domicileCity, studyQualification, graduate, highGraduate, stillHighStudy,
			mobile, note, dateOfBirth: birthdate, candidateStatusCode } = responseData;
		this.setState({
			id: id,
			firstname: firstname,
			lastname: lastname,
			email: email,
			courseCode: courseCode,
			oldImg: imgpath,
			oldCV: cvExternalPath,
			domicileCity: (domicileCity !== null ? domicileCity : ''),
			studyQualification: (studyQualification !== null ? studyQualification : ''),
			graduate: (graduate !== null ? graduate : false),
			highGraduate: (highGraduate !== null ? highGraduate : false),
			stillHighStudy: (stillHighStudy !== null ? stillHighStudy : false),
			birthdate: (birthdate !== null ? birthdate : ''),
			note: (note !== null ? note : ''),
			mobile: (mobile !== null ? mobile : ''),
			candidateStatusCode: candidateStatusCode
		});
	}

	handleSubmit(event) {
		Commons.debugMessage("CandidateUpdateForm.handleSubmit - START");
		Commons.debugMessage(this.state);
		event.preventDefault();
		this.sendUpdateRequest();
	}

	sendUpdateRequest = () => {
		const formData = new FormData();

		const fileInput = document.querySelector("#imgpath");
		if (fileInput.files[0] !== undefined) {
			console.log("fileInput: " + fileInput);
			console.log("fileInput.files[0]: " + fileInput.files[0]);
			console.log("fileInput.files[0].name: " + fileInput.files[0].name);
			formData.append("files", fileInput.files[0])
			formData.append("imgpath", fileInput.files[0].name)
		}
		const fileInput2 = document.querySelector("#cvpath");
		if (fileInput2.files[0] !== undefined) {
			console.log("fileInput2: " + fileInput2);
			console.log("fileInput2.files[0]: " + fileInput2.files[0]);
			console.log("fileInput2.files[0].name: " + fileInput2.files[0].name);
			formData.append("files", fileInput2.files[0])
			formData.append("cvExternalPath", fileInput2.files[0].name)
		}

		formData.append("firstname", this.state.firstname);
		formData.append("lastname", this.state.lastname);
		formData.append("email", this.state.email);
		formData.append("oldImg", this.state.oldImg);
		formData.append("oldCV", this.state.oldCV);
		formData.append("userId", this.loggedUserId);
		formData.append("insertedBy", this.loggedUserId);
		formData.append("positionCode", this.state.courseCode);

		formData.append("domicileCity", this.state.domicileCity);
		formData.append("studyQualification", this.state.studyQualification);
		//	    Commons.debugMessage("this.state.graduate: " + this.state.graduate);
		formData.append("graduate", this.state.graduate);
		formData.append("highGraduate", this.state.highGraduate);
		formData.append("stillHighStudy", this.state.stillHighStudy);

		if ((this.state.mobile !== undefined) && (this.state.mobile !== null) && (this.state.mobile.length === 10)) {
			formData.append("mobile", this.state.mobile);
		}
		if ((this.state.birthdate !== undefined) && (this.state.birthdate !== null) && (this.state.birthdate.length > 0)) {
			let appoDate = new Date(this.state.birthdate);
			appoDate = new Date(appoDate.setTime(appoDate.getTime() + 1 * 86400000));
			formData.append("dateOfBirth", appoDate);
		}
		if ((this.state.note !== undefined) && (this.state.note !== null) && (this.state.note.length > 0)) {
			formData.append("note", this.state.note);
		}

		formData.append("candidateStatusCode", this.state.candidateStatusCode);




		//	    formData.append("candidateStatusCode", 100);

		//	    Commons.debugMessage(formData);
		Commons.executeFetch(Constants.FULL_CANDIDATE_CUSTOM_API_URI + this.state.currentCandidateId, 'PUT', this.redirectToCandidatesList, this.callbackKoFunction, formData);

	}

	callbackKoFunction = () => {
		alert("MODIFICA KO");
	}

	redirectToCandidatesList = () => {
		this.props.refreshCoursePage();
		// this.setState({
		// 	redirect: true
		// })
	}

	// renderRedirect = () => {
	// 	Commons.debugMessage("CandidateUpdateForm.renderRedirect - START - this.state.redirect: " + this.state.redirect);
	// 	if (this.state.redirect) {
	// 		Commons.debugMessage("CandidateUpdateForm.renderRedirect - START - this.state.courseCode: " + this.state.courseCode);
	// 		//	    	  let target = '/candidates/'+this.state.positionCode ;
	// 		let target = '/candidates/' + this.state.courseCode;
	// 		return <Redirect to={target} />
	// 	}
	// }

	handleInputChange(event) {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
		});
	}

	handleCheckboxChange(event) {
		const checked = event.target.checked;
		const name = event.target.name;
		Commons.debugMessage("CandidateUpdateForm.handleCheckboxChange - START - name: " + name + " - checked: " + checked);
		this.setState({ [name]: checked });
		console.log(this.state);
	}

	handleCandidatesStatesChange(selectedOption) {
		console.log(selectedOption);
		this.setState({ candidateStatusCode: selectedOption.value });
		//        this.props.setCandidateNewPositionCode(selectedOption.value);
	}

	// goBack(event) {
	// 	event.preventDefault();
	// 	this.props.history.goBack();
	// }

	setCandidateNewPositionCode = (code) => {
		Commons.debugMessage("code: " + code);
		//    	this.setState({candidate: { courseCode: code}});
		//    	this.state.courseCode = code ;
		this.setState({ courseCode: code });
		//    	this.setState({positionCode: this.state.candidate.courseCode });
	}

	cancelSubmit = () => {
		this.setState({ isModalOpen: false });
	}

	render() {
		return (
			<div>
				<Dialog
					open={this.state.isModalOpen}
					onClose={() => this.setState({ isModalOpen: false })}
					style={{ marginTop: '100px'}}
				>
					<DialogTitle>Modifica Candidato</DialogTitle>
					<DialogContent>

						<TextField
							fullWidth
							label="Nome"
							name="nome"
							value={this.state.firstname}
							onChange={this.handleInputChange}
							style={styles.field}
						/>

						<TextField
							fullWidth
							label="Cognome"
							name="cognome"
							value={this.state.lastname}
							onChange={this.handleInputChange}
							style={styles.field}
						/>

						<TextField
							fullWidth
							label="E-mail"
							name="e-mail"
							value={this.state.email}
							onChange={this.handleInputChange}
							style={styles.field}
						/>

						<TextField
							fullWidth
							label="Numero di telefono personale"
							name="numero di telefono personale"
							value={this.state.mobile}
							onChange={this.handleInputChange}
							style={styles.field}>
						</TextField>

						<label style={styles.label}>Data di Nascita</label>
						<TextField
							fullWidth
							name="Data di nascita"
							type="date"
							value={this.state.birthdate}
							onChange={this.handleInputChange}
							style={styles.fieldBeforeSelect}
						>
						<input id="date-input" type="date"></input>
						</TextField>

						<TextField
							fullWidth
							label="Domicilio"
							name="domicilio"
							value={this.state.domicileCity}
							onChange={this.handleInputChange}
							style={styles.field}
						/>

						<TextField
							fullWidth
							label="Titolo di studio"
							name="titolo di studio"
							value={this.state.studyQualification}
							onChange={this.handleInputChange}
							style={styles.field}
						/>

						<FormControlLabel
							control={
								<Checkbox
									name="graduate"
									checked={this.state.graduate}
									onChange={this.handleCheckboxChange}
								/>
							}
							label="Laureato"
						/><br></br>

						<FormControlLabel
							control={
								<Checkbox
									name="highGraduate"
									checked={this.state.highGraduate}
									onChange={this.handleCheckboxChange}
								/>
							}
							label="Laurea Magistrale (già conseguita)"
						/><br></br>

						<FormControlLabel
							control={
								<Checkbox
									name="stillHighStudy"
									checked={this.state.stillHighStudy}
									onChange={this.handleCheckboxChange}
								/>
							}
							label="Laurea in corso"
						/><br></br>

						<label>Posizione</label>
						<CandidateUpdateFormPositionCodeSelect defaultValue={this.state.courseCode} setCandidateNewPositionCode={this.setCandidateNewPositionCode} />
						<br></br>
						<label>Allega CV (.doc, .pdf, .docx, .odt)</label>
						<CandidateProfileCVDownloadImage cvExternalPath={this.state.oldCV} />
						<input style={styles.fieldBeforeSelectWithLabel} type="file" id="cvpath" accept=".doc,.pdf,.docx,.odt" />
						<br></br>
						<label>Allega immagine profilo (.png, .jpeg, .gif, .jpg)</label>
						<CandidateProfileImage img={this.state.oldImg} />
						<input style={styles.fieldBeforeSelect} type="file" id="imgpath" accept=".png,.jpeg,.gif,.jpg" />
						<br></br>
						<label>Note tecniche</label>
						<textarea style={styles.field} value={this.state.note} name="note" onChange={this.handleInputChange} rows="10" className="note-textarea" />

						<label>Stato candidatura</label>
						<Select
							value={this.state.candidateStates.filter(({ value }) => value === this.state.candidateStatusCode)}
							onChange={this.handleCandidatesStatesChange}
							options={this.state.candidateStates}
							style={styles.fieldBeforeButtons}
						/>
						<br></br>
					</DialogContent>
					<DialogActions>
						<SaveButton
							onClick={this.handleSubmit}
						>
						</SaveButton>
						<CancelButton
							onClick={this.cancelSubmit}
						>
						</CancelButton>
					</DialogActions>
				</Dialog>
				<div>
					<EditButton onClick={() => this.setState({ isModalOpen: true })} />
				</div>
			</div>
		);
	}
}

export default withRouter(CandidateUpdateForm);
