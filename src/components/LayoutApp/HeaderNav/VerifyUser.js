import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input } from "antd";
import { AuditOutlined, SaveOutlined } from '@ant-design/icons';
import { requiredField } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import {  rxShowVerifyUser, rxVerifyUser } from '../../../appRedux/actions';

const { Item } = Form

const VerifyUser = () => {

  const { showVerifyUser, loadingVerifyUser } = useSelector(state => state.get("users"));

  const [ form ] = Form.useForm();
  const { validateFields } = form;

  const auth = useAuth()

  const dispatch = useDispatch();

  const handleVerifyUser = () => {
    validateFields().then((values) => {
        if(auth.sUsername === values.sUsername){
            dispatch(rxVerifyUser(auth.sUsername, values.sPassword, () => {
                dispatch(rxShowVerifyUser(false))
            }))
        }else {
            dispatch(rxShowVerifyUser(false))
        }
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
            autoComplete="off"
        >
            <Item name="sUsername" label="Usuario" rules={requiredField}>
                <Input/>
            </Item>
            <Item name="sPassword" label="Contraseña" rules={requiredField}>
                <Input/>
            </Item>
            <Button type="primary" block htmlType='submit'>
                <div className='flex justify-center'>
                    <SaveOutlined className="mt-1 mr-2"/>
                    <p>Verificar</p>
                </div>
            </Button>
        </Form>
    </Modal>
  )
}

export default VerifyUser;