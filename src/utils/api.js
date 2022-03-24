import axios from 'axios';
// import { apiUrl } from './constants';
const apiUrl = 'https://at-backend1.herokuapp.com/';
axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('auth-token')}`;

export function addSensor(id, name, macAddress) {
	console.log(name, id);
	return axios.post(`${apiUrl}sensor/add`, {
		name,
		macAddress,
	})
		.then((res) => res.status)
		.catch((err) => err);
}
export function addAsset(id, Ctype, loc) {
	console.log(id, Ctype);
	return axios.post(`${apiUrl}asset/add`, {
		type: Ctype,
		location: loc,
	})
		.then((res) => res.status)
		.catch((err) => err);
}

export function updateAsset(id, Ctype, loc) {
	console.log(id, loc);
	return axios.patch(`${apiUrl}asset/update/${id}`, {
		type: Ctype,
	})
		.then((res) => res.status)
		.catch((err) => err);
}

export function getSensors() {
	return axios.get(`${apiUrl}sensor/all`)
		.then((res) => res.data)
		.catch((err) => {
			// catch error
			console.error(err);
		});
}

export function getSensorById(id, time) {
	return axios.get(`${apiUrl}sensor/get/data/${id}?date=${time}`)// use id url
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			// catch error
			console.log(id);
			console.error(err);
		});
}

export function getAssets() {
	return axios.get(`${apiUrl}asset/all`)
		.then((res) => res.data)
		.catch((err) => {
			// catch error
			console.error(err);
		});
}
export function sendLoginRequest(emailParam, passwordParam) {
	return axios.post('https://at-backend1.herokuapp.com/auth/login', {
		email: emailParam,
		password: passwordParam,
	}).then((res) => {
		localStorage.setItem('access_token', res.data.access_token);
		return res.data.access_token;
	});
}
export function sendSignupRequest(emailParam, passwordParam) {
	return axios.post('https://at-backend1.herokuapp.com/users/signup', {
		email: emailParam,
		password: passwordParam,
	}).then((res) => {
		localStorage.setItem('access_token', res.data.access_token);
		return res.data.access_token;
	});
}
export function attachSensortoAsset(sensorId, assetIdParam) {
	return axios.patch(`${apiUrl}sensor/attach/${sensorId}`, {
		assetId: assetIdParam,
	}).then((res) => res.status)
		.catch((err) => {
		// catch error
			console.error(err);
			return err.response.status;
		});
}
export function deAttachSensortoAsset(sensorId) {
	return axios.patch(`${apiUrl}sensor/deattach/${sensorId}`).then((res) => res.status)
		.catch((err) => {
		// catch error
			console.error(err);
		});
}

export function simulateSensorDataById(sensorId) {
	return axios.post(`https://tranquil-dawn-42923.herokuapp.com/api/simulateById/${sensorId}`)
		.then((res) => console.log(res))
		.catch((err) => {
		// catch error
			console.error(err);
		});
}
export function StopSimulateSensorDataById(sensorId) {
	return axios.post(`https://tranquil-dawn-42923.herokuapp.com/api/cancelSimulationById/${sensorId}`)
		.then((res) => console.log(res))
		.catch((err) => {
		// catch error
			console.error(err);
		});
}
