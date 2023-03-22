import React from "react";
import './Question.css';
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select
} from "@material-ui/core";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            uniqueCourseCode: [],
            uniqueEmails: [],
            uniqueSurveyLabels: [],
            surveyToken: [],
            filteredEmail: [],
            selectedCourseCode: '',
            selectedEmail: '',
            selectedSurveyLabel: '',
            selectedDate: '',
            isModalOpen: false,
        };
        this.gridRef = React.createRef();
    }

    fetchCandidates = () => {
        Commons.executeFetch(Constants.FULL_ALL_CANDIDATES_API_URI, 'GET', this.setCandidates);
    }

    fetchQuestion = () => {
        Commons.executeFetch(Constants.FULL_SURVEY_API_URI, 'GET', this.setQuestion);
    }

    handleSubmit = () => {
        const currentDate = new Date();
        const selectedDate = new Date(this.state.selectedDate);
        if (selectedDate >= currentDate) {
            this.fetchInsert();
            this.setState({ isModalOpen: false });
        } else {
            toast.error("Data troppo antecedente", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }

    fetchInsert = () => {
        const candidate = this.state.candidates.find(u => u.email === this.state.selectedEmail);

        const question = this.state.surveyToken.find(u => u.label === this.state.selectedSurveyLabel);
        if (candidate) {
            const candidateId = candidate.id;
            const surveyId = question.id;
            const expirationDateTime = new Date(this.state.selectedDate);
            expirationDateTime.setHours(24);
            expirationDateTime.setMinutes(59);
            expirationDateTime.setSeconds(59);
            var item = {
                candidateId: candidateId,
                surveyId: surveyId,
                expirationDateTime: expirationDateTime
            };
            Commons.executeFetch(Constants.INSERT_SURVEYTOKEN_API_URI, "POST", this.insertSuccess, Commons.operationError, JSON.stringify(item), true);
        }

    }

    insertSuccess = () => {
        Commons.operationSuccess();
        this.props.refreshSurveysList()
    }

    setCandidates = (candidates) => {
        Commons.debugMessage("setCandidates - START - candidates: " + candidates);
        const uniqueEmails = [...new Set(candidates.map(candidate => candidate.email))];
        const uniqueCourseCode = [...new Set(candidates.map(candidate => candidate.courseCode))];
        this.setState({
            candidates: candidates,
            uniqueEmails: uniqueEmails,
            uniqueCourseCode: uniqueCourseCode
        });
    }

    setQuestion = (questionToSet) => {
        Commons.debugMessage("questionToSet - START - " + questionToSet);
        const uniqueSurveyLabels = [...new Set(questionToSet.map(question => question.label))];
        this.setState({
            surveyToken: questionToSet,
            uniqueSurveyLabels: uniqueSurveyLabels
        });
    }

    handleEmailSelect = (e) => {
        this.setState({ selectedEmail: e.target.value });
    };

    handleSurveyLabelSelect = (e) => {
        this.setState({ selectedSurveyLabel: e.target.value });
    };

    handleDateSelect = (e) => {
        this.setState({ selectedDate: e.target.value });
    };

    resetData = () => {
        this.setState({
            selectedEmail: '',
            selectedSurveyLabel: '',
            selectedDate: ''
        }, () => {
            document.getElementById('date-input').value = '';
        });
    }

    getEmailsByCourseCode = (selectedCourseCode) => {
        const filteredCandidates = this.state.candidates.filter(candidate => candidate.courseCode === selectedCourseCode);
        const emails = filteredCandidates.map(candidate => candidate.email);
        this.setState({ filteredEmail: emails });
    }

    componentDidMount() {
        this.fetchCandidates()
        this.fetchQuestion()
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.setState({ isModalOpen: false });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.isModalOpen}
                    onClose={() => this.setState({ isModalOpen: false })}
                >
                    <DialogTitle>Inserimento Question</DialogTitle>
                    <DialogContent>
                        <Select
                            fullWidth
                            label="CourseCode"
                            name="courseCode"
                            value={this.state.selectedCourseCode}
                            onChange={(e) => {
                                this.getEmailsByCourseCode(e.target.value);
                                this.setState({ selectedCourseCode:e.target.value });
                              }}
                            style={{ marginBottom: "10px" }}
                        >
                            {/* <option value="">Seleziona utente</option> */}
                            {this.state.uniqueCourseCode.map(courseCode => (
                                <option key={courseCode} value={courseCode}>{courseCode}</option>
                            ))}
                        </Select>
                        <Select
                            fullWidth
                            label="Utente"
                            name="utente"
                            value={this.state.selectedEmail}
                            onChange={(e) => this.setState({ selectedEmail: e.target.value })}
                            style={{ marginBottom: "10px" }}
                        >
                            {/* <option value="">Seleziona utente</option> */}
                            {/* {this.state.uniqueEmails.map(email => (
                                <option key={email} value={email}>{email}</option>
                            ))} */}
                            {this.state.filteredEmail.map(email => (
                                <option key={email} value={email}>{email}</option>
                            ))}
                        </Select>
                        <Select
                            fullWidth
                            label="Questionario"
                            name="questionario"
                            value={this.state.selectedSurveyLabel}
                            onChange={(e) => this.setState({ selectedSurveyLabel: e.target.value })}
                            style={{ marginBottom: "10px" }}
                        >
                            {this.state.uniqueSurveyLabels.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </Select>
                        <TextField
                            fullWidth
                            name="date"
                            type="date"
                            value={this.state.selectedDate}
                            onChange={this.handleDateSelect}
                            style={{ marginBottom: "10px" }}
                        >
                            <input id="date-input" type="date"></input>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ marginRight: "14px" }}
                            color="primary"
                            disabled={!this.state.selectedEmail || !this.state.selectedSurveyLabel || !this.state.selectedDate}
                            onClick={this.handleSubmit}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={this.resetData}
                            style={{ marginRight: "14px" }}
                            id="buttonResetForm"
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={this.cancelSubmit}
                            style={{ margin: "7px" }}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <div>
                    <Button
                        variant="contained"
                        style={{
                            marginTop: "-45px",
                            marginBottom: "0px",
                            backgroundColor: "green",
                            color: "#fff",
                            float: "right",
                        }}
                        onClick={() => this.setState({
                            isModalOpen: true, selectedEmail: '',
                            selectedSurveyLabel: '',
                            selectedDate: ''
                        })}
                    >
                        +
                    </Button>
                </div>
            </div>
        );
    }
}

export default AddQuestion;