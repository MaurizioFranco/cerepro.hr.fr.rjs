import AllCandidateSurveys from './AllCandidateSurveys';
import styles from '../../styles';

export default class CandidateSurveysDid extends AllCandidateSurveys {

    render() {
        return (
            <div style={styles.divContainer} className="App">
                {this.candidateSurveysDidSection()}
            </div>
        );
    }

}