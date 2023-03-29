import AllCandidateSurveys from './AllCandidateSurveys';
import styles from '../../styles';

export default class CandidateSurveysExpired extends AllCandidateSurveys {

    render() {
        return (
            <div style={styles.divContainer} className="App">
                {this.candidateSurveysExpiredSection()}
            </div>
        );
    }

}