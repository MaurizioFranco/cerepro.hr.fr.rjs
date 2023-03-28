import AllCandidateSurveys from './AllCandidateSurveys';


export default class CandidateSurveysToDo extends AllCandidateSurveys {

    render() {
        return (
            <div className="App">
                {this.candidateSutveysToDoSection()}
            </div>
        );
    }

}