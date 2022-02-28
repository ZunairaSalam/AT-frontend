/* eslint-disable no-unused-vars */
/* eslint-disable no-loss-of-precision */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import moment from 'moment';

export const getToken = () => localStorage.getItem('access_token');
export const columns = [
	{
		title: 'Sr.No',
		key: 'uid',
		render: (text, object, index) => index + 1,
	},
	{
		title: 'Angle Pitch',
		dataIndex: 'anglePitch',
		key: 'anglePitch',
	},
	{
		title: 'Angle Roll',
		dataIndex: 'angleRoll',
		key: 'angleRoll',
	},
	{
		title: 'Movement Count',
		dataIndex: 'movementCount',
		key: 'movementCount',
	},
	{
		title: 'Battery Voltage',
		dataIndex: 'batteryVoltage',
		key: 'batteryVoltage',
	},
	{
		title: 'Time Stamp',
		dataIndex: 'timestamp',
		key: 'timestamp',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix(),
		render: (text) => moment(text).format('MMM Do YY, h:mm:ss a'),
	},
];
export const apiUrl = 'https://at-backend1.herokuapp.com/';
// https://at-backend1.herokuapp.com/sensor/get/Data/36

export const timeOptionsArray = [{
	key: '5',
	timeOptionString: '15 mins',
},
{
	key: '30',
	timeOptionString: '30 mins',
},
{
	key: '60',
	timeOptionString: '1 hour',
},
{
	key: '300',
	timeOptionString: '5 hours',
}];

export const assetColumns = [
	{
		title: 'Asset id',
		dataIndex: 'id',
		key: 'assetId',
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'assetType',
	},
	{
		title: 'Location',
		dataIndex: 'location',
		key: 'assetLocation',
	},
	{
		title: 'Sensor Id',
		render: (record) => (record.sensor ? record.sensor.uid : 'Not attached'),
		key: 'suid',
	},
];

export const activeColumns = [
	{
		title: 'Sensor Id',
		key: 'uid',
		dataIndex: 'uid',
	},
	{
		title: ' Sensor Name',
		key: 'name',
		dataIndex: 'name',
	},
	{
		title: 'Asset id',
		render: (record) => (record.asset.id),
		key: 'assetId',
	},
	{
		title: 'Asset Type',
		render: (record) => (record.asset.type),
		key: 'type',
	},
	{
		title: 'Asset Location',
		render: (record) => (record.asset.location),
		key: 'location',
	},
];
export const inActiveColumns = [
	{
		title: 'Sensor Id',
		key: 'uid',
		dataIndex: 'uid',
	},
	{
		title: ' Sensor Name',
		key: 'name',
		dataIndex: 'name',
	},
];

export const locations = [
	{
		name: 'Container 1',
		location: {
			lat: 25.109895082618078,
			lng: 62.342519825122355,
		},
	},
	{
		name: 'Container 2',
		location: {
			lat: 25.109792595317908,
			lng: 62.342519824864265,
		},
	},
	{
		name: 'Container 3',
		location: {
			lat: 25.109236485439713,
			lng: 62.342519825122355,
		},
	},
	{
		name: 'Container 4',
		location: {
			lat: 25.109236485439713,
			lng: 62.342928716793265,
		},
	},
	{
		name: 'Container 5',
		location: {
			lat: 25.109987654335588,
			lng: 62.346543225122355,
		},
	},
];
