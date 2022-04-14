/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
	Form,
	Input,
	Button,
	Select,
	Layout,
	// Divider,
	Row,
	Col,
	Alert,
	message,
} from 'antd';
import { addAsset, getBlocks } from '../../../../utils/api';

const { Content } = Layout;

function AddAssetForm({
	setConfirmLoading, setVisible, updateStateVal, updateState,
}) {
	const [assetId, setAssetId] = useState();
	const [blocksData, setBlocksData] = useState();
	const onFinish = (values) => {
		setConfirmLoading(true);
		console.log(values.sku, values.type, values.placement);
		addAsset(values.sku, values.type, values.placement)
			.then((res) => {
				console.log(res);
				setVisible(false);
				message.success(`Asset with sku# ${values.sku} Added!`);
			});
		setAssetId(values.sku);
		updateState(!updateStateVal);
	};

	useEffect(() => {
		getBlocks().then((res) => {
			if (!res) return;
			setBlocksData(res);
			console.log(res);
		});
	}, [updateStateVal]);

	return (
  <Layout>
    {/* <Divider orientation="center">Add New Asset</Divider> */}
    <br />
    <Content>
      <Row justify="center" align="middle">
        <Col span={22}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
          >
            <Form.Item
              label="Asset SKU"
              name="sku"
              rules={[
            	{
            		required: true,
            		message: 'Asset sku cannot be empty!',
            	},
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
            	{
            		required: true,
            		message: 'type cannot be empty!',
            	},
              ]}
            >
              <Select>
                <Select.Option value="Container 2020">Container 2020</Select.Option>
                <Select.Option value="Container 2021">Container 2021</Select.Option>
                <Select.Option value="Container 2022">Container 2022</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item label="Description" name="description">
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Placement"
              name="placement"
              rules={[
            	{
            		required: true,
            		message: 'placement cannot be empty!',
            	},
              ]}
            >

              <Select>
                { blocksData?.map((block) => (
                  <Select.Option key={block.uid} value={block.uid}>
                    {block.blockName}
                  </Select.Option>
                ))}

              </Select>

            </Form.Item>
            {/* <Form.Item style={{ alignContent: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-form-button">ADD</Button>
            </Form.Item> */}
            <Row justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Add Asset</Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Content>
  </Layout>
	);
}
export default AddAssetForm;
