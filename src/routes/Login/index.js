import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Input, Button, message} from 'antd';
import { rxLoginUser } from '../../apis';
import { cardProps, requiredField } from '../../util/config';
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';

const { Item } = Form;

const Login = () => {
   //TODO: HOOKS INHERED FROM ANTD
   const [form] = Form.useForm();
   const { validateFields, resetFields, setFieldsValue } = form;

  const [loadingLoginUser, setLoadingLoginUser] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = () => {
    validateFields().then((values) => {
      setLoadingLoginUser(true)
      rxLoginUser(values.email, values.password, () => {
          message.success("Registrado")
          setLoadingLoginUser(false)
          resetFields()
          navigate('/')
      })
  })
}
  return (
    <Card
      {...cardProps}
      style={{ width: "350px"}}
      bodyStyle={{ padding: 10 }}
      title={<div className='flex justify-between'> Bienvenido <UserOutlined /></div>}

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
                      block 
                      icon={<GoogleOutlined />}
                      loading={loadingLoginUser}
                  >
                      Ingresar
                  </Button>
              </Col>
          </Row>
      </Form>
    </Card>
  )
}

export default Login