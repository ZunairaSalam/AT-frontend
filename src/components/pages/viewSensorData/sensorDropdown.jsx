/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
	Menu,
} from 'antd';

function SensorDropdown({
	// eslint-disable-next-line react/prop-types
	uid, sname, asset, func,
}) {
	const onClickHandler = (id) => {
		console.log(id);
		func(id);
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
    <Menu.Item key={uid}>
      <div
        onClick={(e) => {
      	e.preventDefault();
      	onClickHandler(uid);
        }}
        role="button"
        tabIndex="0"
      >
        <span>
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
