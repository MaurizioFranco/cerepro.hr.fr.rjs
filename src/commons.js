
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
export function getAuthorizationHeaderFromToken(token, isBodyAJSON) {
	let authToken = null ;
	if (isBodyAJSON!==null && isBodyAJSON) {
        authToken = { 
			'Authorization': 'Basic ' + token,
			'Content-Type': 'application/json'
		} ;
	} else {
		authToken = { 
			'Authorization': 'Basic ' + token 
		} ;
	}
	debugMessage("getAuthorizationHeader - START - authToken: " + authToken);
	return authToken;
}

export function getUserLoggedId () {
	debugMessage("Commons.getUserLoggedId - START");
	let userId = sessionStorage.getItem('userId');
	return userId ;
	
}

export function executeFetch (uri, method, successCallbackFunction, callbackFunctionKO, body, isBodyAJSON) {
	debugMessage("Commons.executeFetch - START - uri: " + uri);
	let token = sessionStorage.getItem('headerToken');
	// let headerToken = null ;
	// if (isBodyAJSON!==null && isBodyAJSON) {
    let headerToken = getAuthorizationHeaderFromToken(token, isBodyAJSON);
	// } else {
        // headerToken = getAuthorizationHeaderFromToken(token);
	// }
	executeFetchWithHeader (uri, method, headerToken, successCallbackFunction, callbackFunctionKO, body)
	
}

export function executeFetchWithHeader (uri, method, headerToken, successCallbackFunction, callbackFunctionKO, body) {
	debugMessage("Commons.executeFetchWithHeader - START - uri: " + uri);
	debugMessage(`Commons.executeFetchWithHeader - DEBUG - body: ${body}`);
	debugMessage(body);
	debugMessage(`Commons.executeFetchWithHeader - DEBUG - method: ${method}  - uri: ${uri}`);
	debugMessage(body);
	trackPromise(
		fetch(uri , {
	        method: method,
			body: body,
			
	        headers: headerToken
	                  },)
		//   .then((response) => {
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			//   console.log(response);
			// //   if (method==="POST" && response.status===201) {
			// // 	  successCallbackFunction(response);
			// //   } else if (response.status===200) {
			// // 	  successCallbackFunction(response.json());
			// //   } else {//ERROR
			// // 	callbackFunctionKO();
			// //   }
		    // //   if(!response.ok) {
		    // // 	  console.warn(response.status); // Will show you the status
		    // // 	  //throw new Error(response.status);
		    // //   } else if (method==="DELETE") {
		    // // 	  return "" ;
			// //   } else return response.json();
			// let responseData = response.json() 
			// //   return response.json();
			// return (responseData) ;
			//     //   if (method==="POST" && response.status===201) {
			// 	// 	  successCallbackFunction(responseData);
			// 	//   } else if (response.status===200) {
			// 	// 	  successCallbackFunction(responseData);
			// 	//   } else {//ERROR
			// 	// 	callbackFunctionKO(responseData);
			// 	//   }
		//   })
		  .then((data) => {
			  debugMessage("Commons.executeFetchWithHeader - DEBUG - data: " + data);
			  if (data.status===200||data.status===201) {
					  successCallbackFunction(data.body);
				  } else {//ERROR
					callbackFunctionKO(data.body);
				  }
			//   if (data!==undefined) {
			// 	successCallbackFunction(data);
			//   } else {
			// 	  callbackFunctionKO(data);
			//   }
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