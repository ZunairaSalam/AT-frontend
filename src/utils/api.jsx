import axios from 'axios';
import { message } from 'antd';
// import { apiUrl } from './constants';
const apiUrl = 'https://at-backend1.herokuapp.com/';
axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('auth-token')}`;

export function addSensor(id, name, macAddress) {
	console.log(name, id);
	return axios.post(`${apiUrl}sensor/add`, {
		imei: id,
		name,
		macAddress,
	})
		.then((res) => res.status)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function addAsset(id, Ctype, areaId) {
	console.log(id, Ctype);
	return axios.post(`${apiUrl}asset/add`, {
		type: Ctype,
		sku: id,
		location: 'port',
		area: areaId,
	})
		.then((res) => res.status)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}

export function updateAsset(id, Ctype, areaId) {
	console.log(id, areaId);
	return axios.patch(`${apiUrl}asset/update/${id}`, {
		type: Ctype,
		area: areaId,
	})
		.then((res) => res.status)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}

export function getSensors() {
	return axios.get(`${apiUrl}sensor/all`)
		.then((res) => res.data)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}

export function getSensorById(id, time) {
	return axios.get(`${apiUrl}sensor/get/data/${id}?date=${time}`)// use id url
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}

export function getAssets() {
	return axios.get(`${apiUrl}asset/all`)
		.then((res) => res.data)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function sendLoginRequest(emailParam, passwordParam) {
	return axios.post('https://at-backend1.herokuapp.com/auth/login', {
		email: emailParam,
		password: passwordParam,
	}).then((res) => {
		console.log(res);
		localStorage.setItem('access_token', res.data.access_token);
		return res.data.access_token;
	})
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function sendSignupRequest(emailParam, passwordParam) {
	return axios.post('https://at-backend1.herokuapp.com/users/signup', {
		email: emailParam,
		password: passwordParam,
	}).then((res) => {
		localStorage.setItem('access_token', res.data.access_token);
		return res.data.access_token;
	})
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function attachSensortoAsset(sensorId, assetIdParam) {
	return axios.patch(`${apiUrl}sensor/attach/${sensorId}`, {
		assetId: assetIdParam,
	}).then((res) => res)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function deAttachSensortoAsset(sensorId) {
	return axios.patch(`${apiUrl}sensor/deattach/${sensorId}`).then((res) => res.status)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}

export function getSensorsByLastActive() {
	return axios.get(`${apiUrl}sensor/map`)
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => message.error(err.response.data.message));
}

export function deleteAssetbyId(assetId) {
	return axios.delete(`${apiUrl}asset/${assetId}`)
		.then((res) => res.status)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function deleteSensorbyId(sensorId) {
	return axios.delete(`${apiUrl}sensor/delete/data/${sensorId}`)
		.then((res) => {
			if (res.status === 200) {
				axios.delete(`${apiUrl}sensor/delete/${sensorId}`)
					.then((response) => response.status);
			}
		})
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}

export function getBlocks() {
	return axios.get(`${apiUrl}area/all`)
		.then((res) => res.data)
		.catch((err) => {
			message.error(err.response.data.message);
			console.log(err);
		});
}
export function deleteBlock(blockId) {
	return axios.delete(`${apiUrl}area/delete/${blockId}`)
		.then((res) => res.status)
		.catch((err) => {
			message.error(err.response.data.error);
			console.log(err);
		});
}

export function addBlock(blockName) {
	return axios.post(`${apiUrl}area/add`, {
		blockName,
	})
		.then((res) => res.data)
		.catch((err) => {
			message.error(err.response.data.error);
			console.log(err);
		});
}

export function editBlock(uid, blockName) {
	return axios.patch(`${apiUrl}area/update/${uid}`, {
		blockName,
	})
		.then((res) => res.data)
		.catch((err) => {
			message.error(err.response.data.error);
			console.log(err);
		});
}
