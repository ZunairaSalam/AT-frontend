// eslint-disable-next-line no-unused-vars
import react from 'react';

export const columns = [
	{
		title: 'Uid',
		dataIndex: 'uid',
		key: 'uid',
		// eslint-disable-next-line react/react-in-jsx-scope
		render: (text) => <a href={text}>{text}</a>,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
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
];
export const apiUrl = 'https://at-backend1.herokuapp.com/';
