
import * as Environment from './env.js';

export const BACKEND_API_PREFIX = "http://" + Environment.HOST + ":" + Environment.PORT + Environment.APPLICATION_CONTEXT ;
export const FRONTEND_API_PREFIX = "http://" + Environment.FRONTEND_HOST + Environment.FRONTEND_APPLICATION_CONTEXT ;

export const CANDIDATE_PROFILE_IMAGES_RELATIVE_FOLDER = "/canimg/" ;
export const CANDIDATE_PROFILE_CV_RELATIVE_FOLDER = "/cancv/" ;

export const SURVEYREPLY_PDF_FILE_PATH = "/cansurv/" ;

export const SUCCESS_ALERT_DIALOG = "success" ;
export const DANGER_ALERT_DIALOG = "danger" ;

export const COURSEPAGE_API = '/api/v1/coursepage/' ;
export const CANDIDATE_CUSTOM_API = '/api/v1/candidatecustom/' ;
export const CANDIDATE_STATES_API = '/api/v1/candidateStates/' ;
export const CANDIDATE_STATES_BY_CODE_API = '/api/v1/candidateStates/orderByStatusCode' ;
export const CANDIDATE_SURVEY_TOKEN_CUSTOM_API = '/api/v1/candidatesurveytokencustom/' ;
export const CANDIDATE_SURVEY_TOKEN_API = '/api/v1/candidatesurveytoken/' ;
export const COURSE_CANDIDATE_API = '/api/v1/user/javacoursecandidate/';
export const SURVEY_API = '/api/v1/survey/';
export const DELETE_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + CANDIDATE_SURVEY_TOKEN_API ;
export const INSERT_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + CANDIDATE_SURVEY_TOKEN_API ;
export const SURVEYTOKEN_SENDEMAIL_API = '/api/v1/candidatesurveytoken/sendEmail/';
export const SURVEYREPLY_WEEK_API = '/api/v1/surveyreply/lastweek';
export const SURVEYREPLY_MONTH_API = '/api/v1/surveyreply/lastmonth';
export const SURVEYREPLY_YEAR_API = '/api/v1/surveyreply/lastyear';
export const QUESTION_API = '/api/v1/question/' ;
export const CANDIDATE_API = '/api/v1/candidate/' ;
export const PDF_END = '/api/v1/pdf/';
export const SURVEYQUESTIONS_API = '/api/v1/surveyquestion/' ;
export const SURVEYQUESTIONCUSTOM_API = '/api/v1/surveyquestioncustom/' ;
export const QUESTIONCANDIDATE_API = '/api/v1/survey/getSurveyForCandidate/';
export const QUESTIONSTART_API = '/api/v1/surveyreplyrequest/start/';
export const QUESTIONSEND_API = '/api/v1/surveyreplyrequest/end/';
export const SURVEYREPLY_ID = '/api/v1/surveyreply/';
export const ROLE_LEVEL_API = '/api/v1/role/level/';
export const COURSEPAGE_CUSTOM_BYDATE_API = '/api/v1/coursepagecustom/bydate/'
export const FULL_ROLE_LEVEL_URI = BACKEND_API_PREFIX + ROLE_LEVEL_API;
export const FULL_SURVEYREPLY_ID_URI = BACKEND_API_PREFIX + SURVEYREPLY_ID;
export const FULL_SURVEYREPLIES_WEEK_API_URI = BACKEND_API_PREFIX + SURVEYREPLY_WEEK_API;
export const FULL_SURVEYREPLIES_MONTH_API_URI = BACKEND_API_PREFIX + SURVEYREPLY_MONTH_API;
export const FULL_SURVEYREPLIES_YEAR_API_URI = BACKEND_API_PREFIX + SURVEYREPLY_YEAR_API;
export const FULL_QUESTIONSEND_API_URI = BACKEND_API_PREFIX + QUESTIONSEND_API;
export const FULL_QUESTIONSTART_API_URI = BACKEND_API_PREFIX + QUESTIONSTART_API;
export const FULL_QUESTIONCANDIDATE_API_URI = BACKEND_API_PREFIX + QUESTIONCANDIDATE_API;
export const FULL_ST_SENDEMAIL_API_URI = BACKEND_API_PREFIX + SURVEYTOKEN_SENDEMAIL_API;
export const FULL_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + CANDIDATE_SURVEY_TOKEN_CUSTOM_API ;
export const FULL_COURSEPAGE_API_URI = BACKEND_API_PREFIX + COURSEPAGE_API ;
//export const FULL_USER_COURSEPAGE_API_URI = BACKEND_API_PREFIX + COURSE_CANDIDATE_API ;
export const FULL_ALL_CANDIDATES_API_URI = BACKEND_API_PREFIX + CANDIDATE_API ;
export const FULL_CANDIDATE_CUSTOM_API_URI  = BACKEND_API_PREFIX + CANDIDATE_CUSTOM_API ;
export const FULL_SURVEY_API_URI  = BACKEND_API_PREFIX + SURVEY_API ;
export const FULL_CANDIDATE_STATES_API_URI  = BACKEND_API_PREFIX + CANDIDATE_STATES_API ;
export const FULL_CANDIDATE_STATES_BY_CODE_API_URI  = BACKEND_API_PREFIX + CANDIDATE_STATES_BY_CODE_API ;
export const FULL_QUESTION_API_URI = BACKEND_API_PREFIX + QUESTION_API ;
export const FULL_SURVEYQUESTIONS_API_URI = BACKEND_API_PREFIX + SURVEYQUESTIONS_API ;
export const FULL_SURVEYQUESTIONCUSTOM_API_URI = BACKEND_API_PREFIX + SURVEYQUESTIONCUSTOM_API ;
export const FULL_PDF_END = BACKEND_API_PREFIX + PDF_END;

export const FULL_APPLICATION_VERSION_URI  = BACKEND_API_PREFIX + '/api/v1/application/info/' ;

export const USER_API_URI  = BACKEND_API_PREFIX + '/api/v1/user/' ;
export const ROLE_API_URI  = BACKEND_API_PREFIX + '/api/v1/role/' ;

export const AUTH_API = '/user' ;
// eslint-disable-next-line no-template-curly-in-string
export const GET_USER_BY_EMAIL_API = '/api/v1/user/email/' ;
export const GET_USER_BY_ROLE_API = '/api/v1/user/role/' ;
export const POSITION_USER_OWNER_API = BACKEND_API_PREFIX + '/api/v1/positionuserowner/' ;
export const COURSEPAGE_CUSTOM_API = BACKEND_API_PREFIX + '/api/v1/coursepagecustom/' ;
export const GET_COURSEPAGE_BY_CODE_API = COURSEPAGE_API + "getBodyText/" ;
export const CREATE_COURSEPAGE_CUSTOM = BACKEND_API_PREFIX + COURSEPAGE_API + "createcoursepagecustom/" ;
export const FULL_API_URI = BACKEND_API_PREFIX + AUTH_API ;
export const FULL_GET_USER_BY_EMAIL_API = BACKEND_API_PREFIX + GET_USER_BY_EMAIL_API;
export const FULL_COURSEPAGE_CUSTOM_BYDATE_API = BACKEND_API_PREFIX + COURSEPAGE_CUSTOM_BYDATE_API;

export const CANDIDATE_CUSTOM_GET_LIST_API = CANDIDATE_CUSTOM_API + 'paginated/1000/0/' ;
export const FULL_CANDIDATE_CUSTOM_GET_LIST_API_URI = BACKEND_API_PREFIX + CANDIDATE_CUSTOM_GET_LIST_API ;

export const FULL_APPLICATION_INFO_API = BACKEND_API_PREFIX + "/api/v1/application/info/" ;
