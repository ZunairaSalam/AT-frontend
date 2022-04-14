import React, { useEffect, useState } from 'react';
import {
	Table, Layout, Typography, Row, Col,
} from 'antd';
import { getSensors } from '../../../utils/api';
import { inActiveColumns } from '../../../utils/constants';
import '../../table.css';

const { Title } = Typography;
const {
	Header,
} = Layout;

function InactiveSensors() {
	const [data, setData] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const inActiveSensors = res?.filter((value) => value.asset === null);
			if (inActiveSensors) {
				console.log(inActiveSensors);
				setData(inActiveSensors);
			}
		});
	}, []);
	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Title level={3}>Currently InActive Sensors</Title>
    </Header>
    <Row justify="center">
      <Col span={9}>
        <Table className="table-striped-rows" columns={inActiveColumns} dataSource={data} />
      </Col>
    </Row>

  </div>
	);
}

export default InactiveSensors;
