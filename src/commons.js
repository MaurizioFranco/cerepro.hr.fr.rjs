
import { trackPromise} from 'react-promise-tracker';

export function getAuthorizationHeader(email, password) {
	debugMessage("getAuthorizationHeader - START - email: " + email + " - password: " + password);
    let authdata = getAuthorizationToken(email, password);
    debugMessage("###"+authdata+"###");
	return { 'Authorization': 'Basic ' + authdata };
}
export function getAuthorizationToken(email, password) {
	debugMessage("getAuthorizationToken - START - email: " + email + " - password: " + password);
    let authdata = window.btoa(email + ':' + password);
    debugMessage("###"+authdata+"###");
    return authdata;
}
export function getAuthorizationHeaderFromToken(token) {
	debugMessage("getAuthorizationHeader - START - token: " + token);
	return { 'Authorization': 'Basic ' + token };
}


export function executeFetch (uri, method, callbackFunction, callbackFunctionKO) {
	debugMessage("Commons.executeFetch - START - uri: " + uri);
	let token = sessionStorage.getItem('headerToken');
	let headerToken = getAuthorizationHeaderFromToken(token);
	this.executeFetchWithHeader (uri, method, headerToken, callbackFunction, callbackFunctionKO)
	
}

export function executeFetchWithHeader (uri, method, headerToken, callbackFunction, callbackFunctionKO) {
	debugMessage("Commons.executeFetchWithHeader - START - uri: " + uri);
	trackPromise(
		fetch(uri , {
	        method: "GET",
	        headers: headerToken
	                  },)
		  .then((response) => {
		      if(!response.ok) {
		    	  console.warn(response.status); // Will show you the status
		    	  //throw new Error(response.status);
		      } else return response.json();
		  })
		  .then((data) => {
			  if (data!==undefined) {
				  callbackFunction(data);
			  } else {
				  callbackFunctionKO();
			  }
		  })
    );
}

const DEBUG_ENABLED = true ;
const INFO_ENABLED = true ;

export function infoMessage (message) {
	if (INFO_ENABLED) {
		console.info(message);
	}
}
export function debugMessage (message) {
	if (DEBUG_ENABLED) {
		console.log(message);
	}
}