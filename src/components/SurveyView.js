import React, { Component } from 'react';
import Surveys from './survey/Surveys';
import * as Commons from "../commons.js";
import * as Constants from "../constants.js";


class SurveyView extends Component {

	render() {
		return (
			<div align="center">
				<div id="start" className="start">
					<h1>Corso Full Stack Developer.</h1>
					<h2>Questionario d'ingresso.</h2>
					<br />
					<p>
						Gentile candidato, questa è la pagina di presentazione del questionario d'ingresso utile per la partecipazione al prossimo
						corso Full Stack Developer in partenza.
						<br /> La preghiamo di compilare il questionario in base alle sue attuali conoscenze. Questo
						ci permetterà di avere idea delle sue attuali competenze, e poter quindi, organizzare al meglio il corso stesso.
					</p>
					<p>
						Attenzione, il questionario va terminato entro il tempo massimo che vedrà in alto a sinistra, una volta iniziata la compilazione.
						<br />Clicchi sul link qui in basso solo quando effettivamente vorrà compilare il questionario.
						<br />Avrà solo una possibilità di compilare il questionario.
					</p>
				</div>
				<Surveys />
			</div>

		);
	}
}
export default SurveyView;