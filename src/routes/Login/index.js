import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Input, Button, message} from 'antd';
import { cardProps, requiredField } from '../../util/config';
import { IdcardOutlined } from '@ant-design/icons';
import { setAuth } from '../../Hooks/auth';
import { rxLoginUser, rxSetUserAuthSucursal } from '../../appRedux/actions';

const { Item } = Form;

const Login = () => {

  const { loadingLoginUser } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: HOOKS INHERED FROM ANTD
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const navigate = useNavigate();

  const handleLogin = () => {
    validateFields().then((values) => {
        dispatch(rxLoginUser(values.sUsername, values.sPassword, (isValidate, user) => {
        if(isValidate){
            //Sucursal principal por defecto
            dispatch(rxSetUserAuthSucursal(user.sBranchOfficesAssigned[0]));
            setAuth(({
                isValidate: true, 
                sUsername: user.sUsername,
                sBranchOfficesAssigned: user.sBranchOfficesAssigned,
                sRol: user.sRol
            }));
            resetFields()
            navigate('/')
        }else {
            message.error("Credenciales incorrectas")
            navigate('/login')
        }
      }))
    })
  }

  return (
    <div className='h-screen flex justify-center items-center'>
        <Card
            {...cardProps}
            style={{ width: "350px", height: "270px" }}
            bodyStyle={{ padding: 10 }}
            title={
                <div className='flex justify-between'> 
                    Bienvenido 
                    <IdcardOutlined className='mt-1' />
                </div>
            }
        >
        <Form
            name='form-user'
            form={form}
            onFinish={handleLogin}
            layout="vertical"
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