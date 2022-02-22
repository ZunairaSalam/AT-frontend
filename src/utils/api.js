import axios from 'axios';
import { apiUrl } from './constants';

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
			console.log(time);
			return res.data;
		})
		.catch((err) => {
			// catch error
			console.log(id);
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
