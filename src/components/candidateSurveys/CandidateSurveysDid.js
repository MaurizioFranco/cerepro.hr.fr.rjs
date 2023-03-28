import AllCandidateSurveys from './AllCandidateSurveys';


export default class CandidateSurveysDid extends AllCandidateSurveys {

    render() {
        return (
            <div className="App">
                {this.candidateSurveysDidSection()}
            </div>
        );
    }

}