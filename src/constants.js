
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
export const DELETE_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + '/api/v1/usersurveytoken/' ;
export const FULL_SURVEYTOKEN_API_URI = BACKEND_API_PREFIX + USER_SURVEYTOKEN_API ;
export const FULL_COURSEPAGE_API_URI = BACKEND_API_PREFIX + COURSEPAGE_API ;
export const FULL_CANDIDATE_API_URI  = BACKEND_API_PREFIX + CANDIDATE_API ;
export const FULL_CANDIDATE_STATES_API_URI  = BACKEND_API_PREFIX + CANDIDATE_STATES_API ;

export const USER_API_URI  = BACKEND_API_PREFIX + '/api/v1/user/' ;
