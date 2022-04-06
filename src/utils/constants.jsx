/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loss-of-precision */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import moment from 'moment';
import { Alert, Space } from 'antd';

export const getToken = () => localStorage.getItem('access_token');

export const columns = [
	{
		title: 'Sr.No',
		key: 'uid',
		render: (text, object, index) => index + 1,
	},
	{
		title: 'Latitude',
		dataIndex: 'latitude',
		key: 'latitude',
	},
	{
		title: 'Longitude',
		dataIndex: 'longitude',
		key: 'longitude',
	},
	{
		title: 'Battery Level',
		dataIndex: 'batterylevel',
		key: 'batteryLevel',
	},
	{
		title: 'Date & Time',
		dataIndex: 'timestamp',
		key: 'timestamp',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix(),
		render: (text) => moment(text).format('MMM Do YY, h:mm:ss a'),
	},
];
// export const apiUrl = 'https://at-backend1.herokuapp.com/';
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
		title: 'Placement',
		dataIndex: 'location',
		key: 'assetLocation',
	},
	{
		title: 'Sensor',
		dataIndex: 'sensor',
		render: (record) => (record !== null ? record.name : (<a href="/attachSensors">Attach Sensor</a>)),
		key: 'suid',
		filters: [
			{
			  text: 'attached',
			  value: 'attached',
			},
			{
			  text: 'Not attached',
			  value: null,
			},
		  ],
		  onFilter: (value, record) => (value === null
			? (record.sensor === null) : (record.sensor !== null)),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
  <Space size="middle">
    <a>
      Update
    </a>
    <a>Delete</a>
  </Space>
		),
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

export const attachSensorColumns = [
	{
		title: 'Sensor Id',
		key: 'uid',
		dataIndex: 'uid',
	},
	{
		title: ' Sensor Name',
		key: 'name',
		dataIndex: 'name',
	}];

export const attachAssetColumns = [
	{
		title: 'Asset sku',
		dataIndex: 'sku',
		key: 'assetSku',
	},
	{
		title: 'Asset Type',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: 'Asset Location',
		dataIndex: 'location',
		key: 'location',
	},
];

export const detachSensorColumns = [
	{
		title: 'Sensor Id',
		key: 'uid',
		dataIndex: 'uid',
	},
	{
		title: ' Sensor Name',
		key: 'name',
		dataIndex: 'name',
	}];
