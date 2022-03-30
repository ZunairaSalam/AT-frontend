import axios from 'axios';
import { getToken } from './constants';

const token = localStorage.getItem('access_token');

export default axios.create({
	baseURL: 'https://at-backend1.herokuapp.com/',
	headers: {
		'Content-type': 'application/json',
		Authorization: `Bearer ${token || getToken()}`,
	},
});
