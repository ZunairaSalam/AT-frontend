/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
	Menu,
} from 'antd';
import moment from 'moment';
import { timeOptionsArray } from '../utils/constants';
// .format('YYYY-MM-DD[T]HH:mm:ss[Z]')
const now = moment();
// eslint-disable-next-line react/prop-types
function TimeDropdown({ func, showFunc }) {
	const onClickHandler = (k) => {
		const date = now.subtract(k, 'minutes');
		func(date);
	};
	return (
  <Menu>
    {timeOptionsArray.map((elm) => (
      <Menu.Item
        key={elm.key}

      >
        <div onClick={(e) => {
      	e.preventDefault();
        	showFunc(elm.timeOptionString);
      	onClickHandler(elm.key);
        }}
        >
          {elm.timeOptionString}

        </div>

      </Menu.Item>
    	))}
  </Menu>
	);
}
export default TimeDropdown;
