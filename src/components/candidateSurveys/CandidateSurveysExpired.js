import AllCandidateSurveys from './AllCandidateSurveys';


export default class CandidateSurveysExpired extends AllCandidateSurveys {

    render() {
        return (
            <div className="App">
                {this.candidateSurveysExpiredSection()}
            </div>
        );
    }

}