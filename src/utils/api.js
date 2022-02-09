import axios from 'axios';
import { apiUrl } from './constants';

// export default function getSensors() {
// 	axios(`${apiUrl}sensor/all`)
// 		.then((response) => {
// 			console.log(response.data);
// 			return response.data;
// 		})
// 		.catch((error) => {
// 			console.error('Error Fetching data', error);
// 		});
// }
export function getSensors() {
	return axios.get(`${apiUrl}sensor/all`)
		.then((res) => res.data)
		.catch((err) => {
			// catch error
			console.error(err);
		});
}
export function getSensorsTest() {
	return axios.get(`${apiUrl}sensor/all`)
		.then((res) => res.data)
		.catch((err) => {
			// catch error
			console.error(err);
		});
}
