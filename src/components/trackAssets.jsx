import React from 'react';
import { Typography } from 'antd';
import AssetTable from './assetTable';

const { Title } = Typography;

function TrackAssets() {
	return (
  <span>
    <Title level={3}>View Assets</Title>
    <AssetTable />
  </span>
	);
}

export default TrackAssets;
