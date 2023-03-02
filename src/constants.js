
import * as Environment from './env.js';

export const BACKEND_API_PREFIX = "http://" + Environment.HOST + ":" + Environment.PORT + Environment.APPLICATION_CONTEXT ;

export const CANDIDATE_PROFILE_IMAGES_RELATIVE_FOLDER = "/canimg/" ;
export const CANDIDATE_PROFILE_CV_RELATIVE_FOLDER = "/cancv/" ;

export const SUCCESS_ALERT_DIALOG = "success" ;
export const DANGER_ALERT_DIALOG = "danger" ;

export const COURSEPAGE_API = '/api/v1/coursepage/' ;
export const CANDIDATE_API = '/api/v1/candidatecustom/' ;
export const CANDIDATE_STATES_API = '/api/v1/candidateStates/' ;
export const USER_SURVEYTOKEN_API = '/api/v1/usersurveytokencustom/';
export const COURSE_CANDIDATE_API = '/api/v1/user/javacoursecandidate/';
export const SURVEY_API = '/api/v1/survey/';
export const DELETE_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + '/api/v1/usersurveytoken/' ;
export const INSERT_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + '/api/v1/usersurveytoken/' ;
export const SURVEYTOKEN_SENDEMAIL_API = '/api/v1/usersurveytoken/sendEmail/';
export const QUESTION_API = '/api/v1/question/' ;
export const SURVEYQUESTIONS_API = '/api/v1/surveyquestion/' ;
export const SURVEYQUESTIONCUSTOM_API = '/api/v1/surveyquestioncustom/' ;
export const FULL_ST_SENDEMAIL_API_URI = BACKEND_API_PREFIX + SURVEYTOKEN_SENDEMAIL_API;
export const FULL_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + USER_SURVEYTOKEN_API ;
export const FULL_COURSEPAGE_API_URI = BACKEND_API_PREFIX + COURSEPAGE_API ;
export const FULL_USER_COURSEPAGE_API_URI = BACKEND_API_PREFIX + COURSE_CANDIDATE_API ;
export const FULL_CANDIDATE_API_URI  = BACKEND_API_PREFIX + CANDIDATE_API ;
export const FULL_SURVEY_API_URI  = BACKEND_API_PREFIX + SURVEY_API ;
export const FULL_CANDIDATE_STATES_API_URI  = BACKEND_API_PREFIX + CANDIDATE_STATES_API ;
export const FULL_QUESTION_API_URI = BACKEND_API_PREFIX + QUESTION_API ;
export const FULL_SURVEYQUESTIONS_API_URI = BACKEND_API_PREFIX + SURVEYQUESTIONS_API ;
export const FULL_SURVEYQUESTIONCUSTOM_API_URI = BACKEND_API_PREFIX + SURVEYQUESTIONCUSTOM_API ;

export const USER_API_URI  = BACKEND_API_PREFIX + '/api/v1/user/' ;
