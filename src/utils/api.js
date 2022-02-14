import axios from 'axios';
import { apiUrl } from './constants';

export function getSensors() {
	return axios.get(`${apiUrl}sensor/all`)
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			// catch error
			console.error(err);
		});
}
export function getSensorsCount() {
	return axios.get(`${apiUrl}sensor/all`)
		.then((res) => res.data)
		.catch((err) => {
			// catch error
			console.error(err);
		});
}
export function getSensorById(id) {
	return axios.get('https://at-backend1.herokuapp.com/sensor/get/Data/36')// use id url
		.then((res) => res.data)
		.catch((err) => {
			// catch error
			console.log(id);
			console.error(err);
		});
}
