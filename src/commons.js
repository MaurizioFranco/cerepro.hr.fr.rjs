
export function getAuthorizationHeader() {
    // return authorization header with basic auth credentials
//    let user = JSON.parse(localStorage.getItem('user'));
	let username = "m.franco@proximainformatica.com";
	let password = "ciaoatutti";
    let authdata = window.btoa(username + ':' + password);
    console.log(authdata);
//    if (user && user.authdata) {
	if (authdata) {
//        return { 'Authorization': 'Basic ' + user.authdata };
		return { 'Authorization': 'Basic ' + authdata };
    } else {
        return {};
    }
}