
import { trackPromise } from 'react-promise-tracker';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function getAuthorizationHeader(email, password) {
	console.log("getAuthorizationHeader - START - email: " + email + " - password: " + password);
	let authdata = getAuthorizationToken(email, password);
	console.log("###" + authdata + "###");
	return { 'Authorization': 'Basic ' + authdata };
}
export function getAuthorizationToken(email, password) {
	console.log("getAuthorizationToken - START - email: " + email + " - password: " + password);
	let authdata = window.btoa(email + ':' + password);
	console.log("###" + authdata + "###");
	return authdata;
}
export function getAuthorizationHeaderFromToken(token, isBodyAJSON) {
	let authToken = null;
	if (isBodyAJSON !== null && isBodyAJSON) {
		authToken = {
			'Authorization': 'Basic ' + token,
			'Content-Type': 'application/json'
		};
	} else {
		authToken = {
			'Authorization': 'Basic ' + token
		};
	}
	console.log("getAuthorizationHeader - START - authToken: " + authToken);
	return authToken;
}

export function getUserLoggedId() {
	console.log("Commons.getUserLoggedId - START");
	let userId = sessionStorage.getItem('userId');
	return userId;

}

export function getUserLoggedRole() {
	console.log("Commons.getUserLoggedRole - START");
	let role = sessionStorage.getItem('role');
	return role;

}

export const executeDelete = async (uri, successCallbackFunction, callbackFunctionKO) => {
	console.log("Commons.executeDelete - START - uri: " + uri);
	let token = sessionStorage.getItem('headerToken');
	let headerToken = getAuthorizationHeaderFromToken(token);
	const response = await fetch(uri, {
		method: 'DELETE',
		headers: headerToken
	})

	console.log(response);
	console.log(response.status);

	// const data = await response.json()

	// console.log(data);

	if (response.status === 204) {
		successCallbackFunction();
	} else {//ERROR
		console.log("DEBUG1");

		const responseData = await response.json()

		// let responseData = response.json() ;
		// console.log(responseData);
		// console.log("DEBUG2");
		callbackFunctionKO(responseData);
	}
	// console.log(JSON.parse(data))

	//return JSON.parse(data)
	//console.log()
}

export function executeFetch(uri, method, successCallbackFunction, callbackFunctionKO, body, isBodyAJSON) {
	console.log("Commons.executeFetch - START - uri: " + uri);
	let token = sessionStorage.getItem('headerToken');
	// let headerToken = null ;
	// if (isBodyAJSON!==null && isBodyAJSON) {
	let headerToken = getAuthorizationHeaderFromToken(token, isBodyAJSON);
	// } else {
	// headerToken = getAuthorizationHeaderFromToken(token);
	// }
	executeFetchWithHeader(uri, method, headerToken, successCallbackFunction, callbackFunctionKO, body)

}

export function executeFetchWithHeader(uri, method, headerToken, successCallbackFunction, callbackFunctionKO, body) {
	console.log("Commons.executeFetchWithHeader - START - uri: " + uri);
	console.log(`Commons.executeFetchWithHeader - DEBUG - body: ${body}`);
	console.log(body);
	console.log(`Commons.executeFetchWithHeader - DEBUG - method: ${method}  - uri: ${uri}`);
	trackPromise(
		fetch(uri, {
			method: method,
			body: body,

			headers: headerToken
		})
			//   .then((response) => {
			.then(
				response => response.json().then(data => ({ status: response.status, body: data }))
			)
			.then((data) => {
				console.log("Commons.executeFetchWithHeader - DEBUG - data: " + data);
				//console.log(data);
				//console.log(data.status);
				//console.log(data.status===201);
				if (method === 'DELETE' && data.status === 204) {
					successCallbackFunction(data.body);
				} else if (data.status === 200 || data.status === 201) {
					successCallbackFunction(data.body);
				} else {//ERROR
					callbackFunctionKO(data.body);
				}
			})
	);
}

export function getUserValues() {
	try {
		let { firstname, role } = JSON.parse(sessionStorage.getItem("user"));
		this.setState({
			username: firstname,
			role: role
		});
	} catch (error) {
		console.error(error);
		this.setState({
			username: "User"
		});
	}
}

export function operationError(err, errorMessage) {
	console.log("OPERATION KO");	
	let errorMsg = (err !== null && err !== undefined && err.errorMessage !== undefined) ? err.errorMessage : "Errore Generico...";
	toast.error(errorMessage===undefined?errorMsg:errorMessage, {
		position: toast.POSITION.BOTTOM_LEFT
	});
	console.warn(err)
}

export function operationSuccess(response, successMessage) {
	console.log("OPERATION OK");
	toast.success(
		successMessage!==null&&successMessage!==undefined?successMessage:"Operazione avvenuta con successo.", 
		{
		position: toast.POSITION.BOTTOM_LEFT
		}
	);
}

export const confirmDelete = (askConfirmMessage, confirmOk, confirmKo, apiToCall, deleteSuccessCallbackFn, deleteFailedCallbackFn) => {
	confirmAlert({
	  message: askConfirmMessage,
	  buttons: [
		{
		  label: confirmOk,
		  onClick: () => deleteItem(apiToCall, deleteSuccessCallbackFn, deleteFailedCallbackFn),
		},
		{
		  label: confirmKo,
		},
	  ],
	});
  }

  export const deleteItem = (apiToCall, deleteSuccessCallbackFn, deleteFailedCallbackFn) => {
	executeDelete(
	  apiToCall,
	  deleteSuccessCallbackFn,
	  deleteFailedCallbackFn
	);
  };

const DEBUG_ENABLED = true;
const INFO_ENABLED = true;

export function infoMessage(message) {
	if (INFO_ENABLED) {
		console.info(message);
	}
}
export function debugMessage(message) {
	if (DEBUG_ENABLED) {
		console.log(message);
	}
} 