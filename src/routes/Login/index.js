import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Input, Button, message} from 'antd';
import { rxLoginUser } from '../../apis';
import { cardProps, requiredField } from '../../util/config';
import { GoogleOutlined, IdcardOutlined, SafetyOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons';

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
      rxLoginUser(values.username, values.password, (user) => {
          message.success("Bienvenido")
          setLoadingLoginUser(false)
          resetFields()
          navigate('/')
      })
  })
}
  return (
    <div className='w-screen flex place-content-center'>
        <Card
        {...cardProps}
        style={{ width: "350px", height: "270px" }}
        bodyStyle={{ padding: 10 }}
        title={
            <div className='flex justify-between'> 
                Bienvenido 
                <IdcardOutlined className='mt-1' />
            </div>}

        >
        <Form
            name='form-user'
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
        >
            <Row gutter={12}>
                <Col span={24}>
                    <Item label="Usuario" name="username" rules={requiredField}>
                        <Input/>
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
                        loading={loadingLoginUser}
                    >
                        Ingresar
                    </Button>
                </Col>
            </Row>
        </Form>
        </Card>
    </div>
  )
}

export default Login;