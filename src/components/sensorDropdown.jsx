/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
	Menu,
} from 'antd';

// eslint-disable-next-line react/prop-types
function SensorDropdown({ uid, sname, func }) {
	const onClickHandler = (id) => {
		console.log(id);
		func(id);
	};

	return (
  <span>
    <Menu.Item key={uid}>
      <div
        onClick={(e) => {
      	e.preventDefault();
      	onClickHandler(uid);
        }}
        role="button"
        tabIndex="0"
      >
        id:
        {uid}
        {' '}
        name:
        {sname}
      </div>
    </Menu.Item>
    <Menu.Divider />
  </span>
	);
}
export default SensorDropdown;
