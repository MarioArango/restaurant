import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Col, Row, Form, Input } from "antd";
import { AuditOutlined, SaveOutlined } from '@ant-design/icons';
import { requiredField } from '../../../util/config';
import {  rxShowVerifyUser, rxVerifyUser } from '../../../appRedux/actions';

const { Item } = Form

const VerifyUser = () => {

  const { showVerifyUser, loadingVerifyUser } = useSelector(state => state.get("users"));

  const [ form ] = Form.useForm();
  const { validateFields } = form;

  const dispatch = useDispatch();

  const handleVerifyUser = () => {
    validateFields().then((values) => {
        dispatch(rxVerifyUser(values.sUsername, values.sPassword))
    })
  }

  const handleCancelModal = () => {
    dispatch(rxShowVerifyUser(false))
  }

  return (
    <Modal
        title={
            <div className='flex justify-start'>
                <AuditOutlined className="mt-1 mr-2"/>
                <p>Verificar usuario</p>
            </div>
        }
        visible={showVerifyUser}
        bodyStyle={{ padding: 10 }}
        width="350px"
        onCancel={handleCancelModal}
        footer={null}
        destroyOnClose
        centered
        loading={loadingVerifyUser}
    >
        <Form
            form={form}
            name="verify-user"
            onFinish={handleVerifyUser}
            layout="vertical"
        >
            <Row gutter={12}>
                <Col span={24}>
                    <Item name="sUsername" label="Usuario" rules={requiredField}>
                        <Input/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item name="sPassword" label="Contraseña" rules={requiredField}>
                        <Input.Password/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Button type="primary" block htmlType='submit'>
                        <div className='flex justify-center'>
                            <SaveOutlined className="mt-1 mr-2"/>
                            <p>Verificar</p>
                        </div>
                    </Button>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default VerifyUser;