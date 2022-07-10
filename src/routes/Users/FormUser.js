import { useState } from 'react';
import { SaveOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button, message} from 'antd';
import { rxRegisterUser } from '../../apis';
import { requiredField } from '../../util/config';

const { Item } = Form;

const FormUser = (props) => {
  const {
    view,
    setView,
    userSelected,
    setUserSelected
  } = props;

  const [loadingCreateUser, setLoadingCreateUser] = useState(false)

      //TODO: HOOKS INHERED FROM ANTD
      const [form] = Form.useForm();
      const { validateFields, resetFields, setFieldsValue } = form;

    const handleSubmit = () => {
        validateFields().then((values) => {
            setLoadingCreateUser(true)
            rxRegisterUser(values.email, values.password, () => {
                message.success("Registrado")
                setLoadingCreateUser(false)
                resetFields()
                setUserSelected(null)
                setView(false)
            })
        })
    }
  const handleCancel = () => {
    setView(false)
  }

  return (
    <>
        {
            view && (
                <Modal
                    title={userSelected? <div><UserOutlined/> Editar usuario</div> : <div><UserAddOutlined/> Registrar Usuario</div>}
                    visible={view}
                    bodyStyle={{ padding: 10 }}
                    width="350px"
                    onCancel={handleCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose
                    loading={loadingCreateUser}
                >
                    <Form
                        name='form-user'
                        form={form}
                        className='gx-form-row0'
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <Row gutter={12}>
                            <Col span={24}>
                                <Item label="Gmail" name="email" rules={requiredField}>
                                    <Input type='email'/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Contraseña" name="password" rules={requiredField}>
                                    <Input.Password />
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Button 
                                    htmlType='submit'
                                    type='primary' 
                                    className='bg-primary' 
                                    block icon={<SaveOutlined />}
                                    loading={loadingCreateUser}
                                >
                                    {userSelected? "Guardar cambios" : "Registrar"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    </>
  )
}

export default FormUser