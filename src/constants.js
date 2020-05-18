
import * as Environment from './env.js';

export const BACKEND_API_PREFIX = "http://" + Environment.HOST + ":" + Environment.PORT + Environment.APPLICATION_CONTEXT ;

export const CANDIDATE_PROFILE_IMAGES_RELATIVE_FOLDER = "/canimg/" ;
export const CANDIDATE_PROFILE_CV_RELATIVE_FOLDER = "/cancv/" ;

export const SUCCESS_ALERT_DIALOG = "success" ;
export const DANGER_ALERT_DIALOG = "danger" ;