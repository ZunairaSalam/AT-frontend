/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
	Form,
	Input,
	Button,
	Select,
	Layout,
	Divider,
	Row,
	Col,
	Alert,
	message,
} from 'antd';
import { updateAsset, getBlocks } from '../../../../utils/api';

const { Content } = Layout;

function UpdateAssetForm({ id, updateState, setVisibleUpdate }) {
	const [showAlert, setShowAlert] = useState(false);
	const [assetId, setAssetId] = useState(id);
	const [blocksData, setBlocksData] = useState();

	const onFinish = (values) => {
		updateAsset(id, values.type, values.placement)
			.then((res) => {
				if (res === 200) {
					updateState(true);
					message.success(`Asset with id: ${id} updated!`);
					setVisibleUpdate(false);
				} else console.log(res);
			});
	};
	useEffect(() => {
		getBlocks().then((res) => {
			if (!res) return;
			setBlocksData(res);
			console.log(res);
		});
	}, []);
	return (
  <Layout>
    {/* <Divider orientation="center">Update Asset</Divider> */}
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
            <Form.Item label="Asset Id" name="sku">
              <Input defaultValue={assetId} disabled />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="Container 2021">Container 2021</Select.Option>
                <Select.Option value="Container 2022">Container 2022</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item label="Description" name="description">
              <Input />
            </Form.Item> */}
            <Form.Item label="Placement" name="placement">
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
                <Button type="primary" htmlType="submit" className="login-form-button">Update</Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Content>

  </Layout>
	);
}
export default UpdateAssetForm;
