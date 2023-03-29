import AllCandidateSurveys from './AllCandidateSurveys';
import styles from '../../styles';

export default class CandidateSurveysToDo extends AllCandidateSurveys {

    render() {
        return (
            <div style={styles.divContainer} className="App">
                {this.candidateSutveysToDoSection()}
            </div>
        );
    }

}