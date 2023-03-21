import React, { Component } from 'react';
import SurveysIonic from './surveysIonic/SurveysIonic';
import { IonContent, IonHeader, IonToolbar } from '@ionic/react';
import './SurveyView.css';
import centauri_academy_header_logo from '../images/header_logo.png';
import Timer from './surveysIonic/Timer.js';


class SurveyView extends Component {
	state = {
		shouldRenderTime: false,
		timer: "",
		sendSurveyProp: ""
	};

	handleShouldRenderTimeChange = (value1, value2, value3) => {
		this.setState({ timer: value1, shouldRenderTime: value2, sendSurveyProp: value3 });
	};

	handleSendSurveyClick  = () => {
		this.setState({ shouldRenderTime: false });
	}

	render() {
		const { shouldRenderTime } = this.state;
		const { timer, sendSurveyProp } = this.state;
		return (
			<div className="surveyView">
				<IonHeader>
					<IonToolbar color="white">
						<img align="left" alt="centauri-academy-logo" src={centauri_academy_header_logo} className="logo" />
						<span className="navbar-brand title">CeRePro.HR</span>
						{shouldRenderTime && (
							<span slot="end" style={{ marginRight: "25px" }}>
								<Timer duration={timer} sendSurveyProp={sendSurveyProp} />
							</span>
						)}
					</IonToolbar>
				</IonHeader>
				<IonContent style={{ height: '100vh' }}>
					<div className="ion-padding">
						<div className="start">
							<br />
							<p>
								Gentile candidato, questa è la pagina di presentazione del questionario d'ingresso utile per la partecipazione al prossimo corso Full Stack Developer in partenza. La preghiamo di compilare il questionario in base alle sue attuali conoscenze. Questo ci permetterà di avere idea delle sue attuali competenze, e poter quindi, organizzare al meglio il corso stesso.

								Attenzione, il questionario va terminato entro il tempo massimo che vedrà in alto a sinistra, una volta iniziata la compilazione. Clicchi sul link qui in basso solo quando effettivamente vorrà compilare il questionario. Avrà solo una possibilità di compilare il questionario.
							</p>
						</div>
					</div>
					<div align="center">
						<SurveysIonic onShouldRenderTimeChange={this.handleShouldRenderTimeChange} onSendSurveyClick={this.handleSendSurveyClick} />
					</div>
				</IonContent>
			</div>
		);
	}
}
export default SurveyView;