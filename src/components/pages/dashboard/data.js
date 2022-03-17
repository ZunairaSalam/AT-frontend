export const buildingData = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [[
					[10, -80],
					[-80, -80],
					[-80, 80],
					[40, 80],
					[40, -20],
					[100, -20],
					[100, -80],
					[30, -80],
					[30, -74],
					[34, -74],
					[34, -68],
					[40, -68],
					[40, -74],
					[94, -74],
					[94, -26],
					[40, -26],
					[40, -60],
					[34, -60],
					[34, 74],
					[-74, 74],
					[-74, 30],
					[10, 30],
					[10, 24],
					[-74, 24],
					[-74, -24],
					[10, -24],
					[10, -30],
					[-74, -30],
					[-74, -74],
					[10, -74],
				]],
			},
		},
	],
};

export const roomsData = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {
				name: 'Zone A',
				color: '#1E90FF',
				square: 576,
			},
			geometry: {
				type: 'Polygon',
				coordinates: [[
					[-74, -30],
					[34, -30],
					[34, -74],
					[-74, -74],
				]],
			},
		}, {
			type: 'Feature',
			properties: {
				name: 'Zone B',
				square: 600,
			},
			geometry: {
				type: 'Polygon',
				coordinates: [[
					[-74, 24],
					[34, 24],
					[34, -24],
					[-74, -24],
				]],
			},
		}, {
			type: 'Feature',
			properties: {
				name: 'Zone C',
				square: 540,
			},
			geometry: {
				type: 'Polygon',
				coordinates: [[
					[-74, 74],
					[34, 74],
					[34, 30],
					[-74, 30],
				]],
			},
		}, {
			type: 'Feature',
			properties: {
				name: 'Zone D',
				square: 288,
			},
			geometry: {
				type: 'Polygon',
				coordinates: [[
					[40, -26],
					[94, -26],
					[94, -74],
					[40, -74],
				]],
			},
		},
	],
};

export const markers = {
	type: 'FeatureCollection',
	features: [
	  {
			coordinates: [-74, 40.7],
			text: 'BLE Tag 1',
			value: 8922,
	  },
	  {
			coordinates: [30.43, 33.33],
			text: 'BLE Tag 2',
			value: 8922,
	  },
	  {
			coordinates: [1.62, -55.75],
			text: 'BLE Tag 3',
			value: 8922,
	  },
	  {
			coordinates: [-43.18, -22.9],
			text: 'BLE Tag 4',
			value: 8922,
	  },
	  {
			coordinates: [50.23, -30.05],
			text: 'BLE Tag 5',
			value: 8922,
	  },
	//   {
	// 		coordinates: [28.95, 41],
	// 		text: 'Istanbul',
	// 		value: 8922,
	//   },
	//   {
	// 		coordinates: [30.3, 59.95],
	// 		text: 'Saint Petersburg',
	// 		value: 8922,
	//   },
	//   {
	// 		coordinates: [28.03, -26.2],
	// 		text: 'Johannesburg',
	// 		value: 8922,
	//   },
	].map((data) => ({
	  type: 'Feature',
	  geometry: {
			type: 'Point',
			coordinates: data.coordinates,
	  },
	  properties: {
			text: data.text,
			value: data.value,
			tooltip: `<b>${data.text}</b>\n${data.value}`,
	  },
	})),
};
