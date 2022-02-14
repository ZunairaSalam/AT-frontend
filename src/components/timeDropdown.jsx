import React from 'react';
import {
	Menu,
} from 'antd';

function TimeDropdown() {
	const onClickHandler = (e) => {
		e.preventDefault();
	};
	return (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com" onClick={(e) => onClickHandler(e)}>Last 15 mins</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">Last 30 mins</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">1 hour</Menu.Item>
  </Menu>
	);
}
export default TimeDropdown;
