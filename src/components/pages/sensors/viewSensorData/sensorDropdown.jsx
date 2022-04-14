/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
	Menu,
} from 'antd';

function SensorDropdown({
	// eslint-disable-next-line react/prop-types
	uid, sname, asset, func,
}) {
	const onClickHandler = (id, name) => {
		console.log(name);
		func(id, name);
	};
	let myColor = 'green';
	let status = 'Active';
	const checkAsset = () => {
		if (!asset) {
			myColor = 'red';
			status = 'InActive';
		}
	};

	return (
  <span>
    {checkAsset()}
    <Menu.Item key={uid} danger>

      <div
        onClick={(e) => {
      	e.preventDefault();
      	onClickHandler(uid, sname);
        }}
        role="button"
        tabIndex="0"
      >
        <span style={{ color: myColor }}>
          id:
          {uid}

        </span>
        {', '}
        {sname}
        {', '}
        <span style={{ color: myColor }}>{status}</span>
      </div>
    </Menu.Item>
    <Menu.Divider />
  </span>
	);
}
export default SensorDropdown;
