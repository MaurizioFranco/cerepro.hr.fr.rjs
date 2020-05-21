
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


export function executeFetch (uri, method, callbackFunction) {
	debugMessage("Commons.executeFetch - START - uri: " + uri);
	let token = sessionStorage.getItem('headerToken');
	let headerToken = getAuthorizationHeaderFromToken(token);
	this.executeFetchWithHeader (uri, method, headerToken, callbackFunction)
	
}

export function executeFetchWithHeader (uri, method, headerToken, callbackFunction) {
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
			  }
		  })
    );
}

const DEBUG_ENABLED = true ;

export function debugMessage (message) {
	if (DEBUG_ENABLED) {
		console.log(message);
	}
}