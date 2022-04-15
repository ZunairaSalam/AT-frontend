/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
	Menu,
} from 'antd';

function SensorDropdown({
	// eslint-disable-next-line react/prop-types
	uid, sname, active, func,
}) {
	const onClickHandler = (id, name) => {
		console.log(name);
		func(id, name);
	};
	// let myColor = 'green';
	// let status = 'Active';
	// const checkAsset = () => {
	// 	if (!asset) {
	// 		myColor = 'red';
	// 		status = 'InActive';
	// 	}
	// };

	return (
  <span>
    {/* {checkAsset()} */}
    <Menu.Item key={uid} danger={!active}>

      <div
        onClick={(e) => {
      	e.preventDefault();
      	onClickHandler(uid, sname);
        }}
        role="button"
        tabIndex="0"
      >
        id:
        {uid}
        {'  '}
        {sname}
        {'  ('}
        {active ? 'Active)' : 'Inactive)'}
      </div>
    </Menu.Item>
    <Menu.Divider />
  </span>
	);
}
export default SensorDropdown;
