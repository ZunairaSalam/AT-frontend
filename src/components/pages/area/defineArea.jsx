/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
	Card, Col, Row, Typography, Button, Tooltip, Modal, Popconfirm, message,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { getBlocks, deleteBlock, addBlock } from '../../../utils/api';
import AddBlockForm from './addBlockForm';
import EditBlockForm from './editBlockForm';

const { Title } = Typography;

/* headStyle={{ backgroundColor: '#13ecff78',
borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
            bodyStyle={{ backgroundColor: '#5ef2ff7d',
            borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
*/
function DefineArea() {
	const [updated, setUpdated] = useState(false);
	const [blocksData, setBlocksData] = useState();

	const [visibleAdd, setVisibleAdd] = useState();
	const [visibleEdit, setVisibleEdit] = useState();

	const [confirmLoading, setConfirmLoading] = useState();
	const [modalTextAdd, setModalTextAdd] = useState(<AddBlockForm
  setConfirmLoading={setConfirmLoading}
  setVisibleAdd={setVisibleAdd}
  updateStateVal={updated}
  updateState={setUpdated}
	/>);
	const [modalTextEdit, setModalTextEdit] = useState();
	useEffect(() => {
		getBlocks().then((res) => {
			if (!res) return;
			setBlocksData(res);
			console.log(res);
		});
	}, [updated]);

	const showModalAdd = () => {
		setVisibleAdd(true);
	  };

	const showModalEdit = () => {
		setVisibleEdit(true);
	};

	  const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisibleAdd(false);
		setVisibleEdit(false);
	  };

	const confirmRemove = (uid) => {
		deleteBlock(uid).then((res) => {
			console.log(res);
			if (res === 200) {
				message.success(`Block ${uid} deleted`);
				setUpdated(!updated);
			}
		});
	};

	const cancel = (e) => {
		console.log(e);
		// message.error('Click on No');
	};

	return (
  <div>
    <Title level={3}>Add or Remove Blocks</Title>
    <div className="site-card-wrapper">
      <Row gutter={8} align="middle">
        {blocksData?.map((block) => (
          <Col>
            <Card
              title={block.blockName}
              bordered={false}
              hoverable
              headStyle={{ backgroundColor: '#3addf370' }}
              bodyStyle={{ backgroundColor: '#3addf370' }}
              actions={[
                <Tooltip title="edit">
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                    	setModalTextEdit(<EditBlockForm
                      id={block.uid}
                      setConfirmLoading={setConfirmLoading}
                      setVisibleEdit={setVisibleEdit}
                      updateStateVal={updated}
                      updateState={setUpdated}
                    	/>);
                    	console.log('****edit******');
                    	showModalEdit();
                    }}
                  />
                </Tooltip>,
                <Popconfirm
                  title="delete this block?"
                  onConfirm={() => confirmRemove(block.uid)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="delete">
                    <DeleteOutlined
                      key="ellipsis"
                    />
                  </Tooltip>
                </Popconfirm>,
              ]}
            >
              No. of Assets
              <br />
              {block.asset.length}
            </Card>
          </Col>
        ))}
        <Col>
          <Tooltip title="add new block">
            <Button
              shape="circle"
              size="large"
              icon={(
                <PlusCircleFilled
                  style={{ fontSize: '29px' }}
                  onClick={showModalAdd}
                />
)}
            />
          </Tooltip>
        </Col>
      </Row>
      <Row justify="center">
        <Modal
          title="Add New Block"
          visible={visibleAdd}
        // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <p>{modalTextAdd}</p>
        </Modal>

      </Row>
      <Row justify="center">
        <Modal
          title="Edit Block"
          visible={visibleEdit}
        // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <p>{modalTextEdit}</p>
        </Modal>

      </Row>
    </div>
    ,
  </div>
	);
}

export default DefineArea;
