import React, { Component } from 'react';
import * as Commons from "../commons.js";
import * as Constants from "../constants.js";
import SurveysIonic from './surveysIonic/SurveysIonic';
import { IonText, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './SurveyView.css';
import centauri_academy_header_logo from '../images/header_logo.png';


class SurveyView extends Component {

	render() {
		return (
			<>
				<IonHeader>
					<IonToolbar color="white" align="left">
					<img alt="centauri-academy-logo" src={centauri_academy_header_logo} className="logo" />
						<span className="navbar-brand title">CeRePro.HR</span>
						{/* <IonTitle className='headerTitle'>Questionario d'ingresso</IonTitle> */}
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
					<div align="center" style={{ marginTop: '-20px' }}>
						<SurveysIonic />
					</div>
				</IonContent>
			</>
		);
	}
}
export default SurveyView;