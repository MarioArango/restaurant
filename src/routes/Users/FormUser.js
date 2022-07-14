import { useEffect, useState } from 'react';
import { SaveOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button, message, Select} from 'antd';
import { requiredField } from '../../util/config';
import { rxRegisterUser, rxUpdateUser } from '../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;

const FormUser = (props) => {
  //TODO: PROPS INHERID INSTANCE
  const {
    view,
    setView,
    userSelected,
    setUserSelected,
    loadingCreateUser, 
    setLoadingCreateUser
  } = props;

  //TODO: METHODS INHERED FROM ANTD
  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: REGISTER USER
  const handleSubmit = () => {
      validateFields().then((values) => {
          setLoadingCreateUser(true);
          const user = {
              sUsername: values.sUsername,
              sPassword: values.sPassword,
              sRol: values.sRol
          }
          if(userSelected){
            rxUpdateUser(userSelected.nIdUser, user, () => {
                message.success("Actualizado")
                setLoadingCreateUser(false)
                resetFields()
                setUserSelected(null)
                setView(false)
            })
          }else {
            rxRegisterUser(user, () => {
                message.success("Registrado")
                setLoadingCreateUser(false)
                resetFields()
                setUserSelected(null)
                setView(false)
            })
          }
      })
  }
  //TODO: CLOSE FORM USER
  const handleCancel = () => {
    setView(false)
  }

  //TODO: ONLY EDIT
  useEffect(() => {
    if(userSelected && view){
        setFieldsValue({
            sUsername: userSelected.sUsername,
            sPassword: userSelected.sPassword,
            sRol: userSelected.sRol,
        })
    }
  }, [userSelected])

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
                        initialValues={{
                            sRol: "cliente"
                        }}
                    >
                        <Row gutter={12}>
                            <Col span={24}>
                                <Item label="Usuario" name="sUsername" rules={requiredField}>
                                    <Input/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Contraseña" name="sPassword" rules={requiredField}>
                                    <Input.Password />
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Rol" name="sRol" rules={requiredField}>
                                    <Select>
                                        <Option value="cliente">Cliente</Option>
                                        <Option value="chef">Chef</Option>
                                        <Option value="administrador">Administrador</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Button 
                                    htmlType='submit'
                                    type='primary' 
                                    className='bg-primary' 
                                    block 
                                    icon={<SaveOutlined />}
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

export default FormUser;