import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button, Select} from 'antd';
import { requiredField } from '../../util/config';
import { rxRegisterUser, rxUpdateUser, rxShowFormUser, rxGetBranchOffices } from '../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;

const FormUser = () => {
  const {
      showFormUser,
      userSelected,
      loadingCreateUser,
      loadingUpdateUser
  } = useSelector(state => state.get("users"));

  const { 
      loadingListBranchOff,
      listBranchOffices,
      showFormBranchOffice,
      loadingDeleteBranchOff,
      loadingCreateBranchOff,
      loadingUpdateBranchOff
    } = useSelector(state => state.get("branchOffices"));  
    
  const dispatch = useDispatch();

  //TODO: METHODS INHERED FROM ANTD
  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: REGISTER USER
  const handleSubmit = () => {
      validateFields().then((values) => {
        const sPassword = btoa(values.sPassword);
        let sBranchOfficesAssigned = [];
        listBranchOffices.forEach(bo => {
            values.sBranchOffices.forEach(vbo => {
                if(bo.nIdBranchOffice === vbo){
                    sBranchOfficesAssigned.push(bo)
                }
            })
        })
        const user = {
            sUsername: values.sUsername,
            sPassword,
            sRol: values.sRol,
            sBranchOfficesAssigned
        }
        if(userSelected){
          dispatch(rxUpdateUser(userSelected.nIdUser, user, () => {
              resetFields()
          }))
        }else {
          dispatch(rxRegisterUser(user, () => {
              resetFields()
          }))
        }
      })
  }
  //TODO: CLOSE FORM USER
  const handleCancel = () => {
    dispatch(rxShowFormUser(false))
  }

  //TODO: ONLY EDIT
  useEffect(() => {
    if(userSelected && showFormUser){
        setFieldsValue({
            sUsername: userSelected.sUsername,
            sPassword: userSelected.sPassword,
            sRol: userSelected.sRol,
            sBranchOffices: userSelected.sBranchOfficesAssigned?.map(bo => bo.nIdBranchOffice)
        })
    }
  }, [userSelected])

   //TODO: INIT - GET ALL BRANCHOFFICES
   useEffect(() => {
    dispatch(rxGetBranchOffices());
  }, [loadingDeleteBranchOff, loadingCreateBranchOff, loadingUpdateBranchOff])

  return (
    <>
        {
            showFormUser && (
            <Modal
                    title={userSelected? 
                        <div className='flex justify-start'>
                            <UserOutlined className='mt-1 mr-2'/> 
                            <p>Editar usuario</p>
                        </div> : 
                        <div className='flex justify-start'>
                            <UserAddOutlined className='mt-1 mr-2'/>
                            <p>Registrar Usuario</p>
                        </div>
                    }
                    visible={showFormUser}
                    bodyStyle={{ padding: 10 }}
                    width="350px"
                    onCancel={handleCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose
                    loading={loadingCreateUser || loadingUpdateUser}
                >
                    <Form
                        name='form-user'
                        form={form}
                        className='gx-form-row0'
                        onFinish={handleSubmit}
                        layout="vertical"
                        initialValues={{
                            sRol: "mozo"
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
                                        <Option value="mozo">Mozo</Option>
                                        <Option value="chef">Chef</Option>
                                        <Option value="administrador">Administrador</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Sucursal" name="sBranchOffices" rules={requiredField}>
                                    <Select
                                        mode="multiple"
                                        loading={loadingListBranchOff}
                                        className="w-full"
                                    >
                                        {
                                            listBranchOffices.map((s, index) => (
                                            <Option key={index} value={s.nIdBranchOffice}>
                                                {s.sBranchOffice}
                                            </Option>
                                            ))
                                        }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Button 
                                    htmlType='submit'
                                    type='primary' 
                                    className='bg-primary' 
                                    block
                                    loading={loadingCreateUser}
                                >
                                    <div className='flex justify-center'>
                                        <SaveOutlined className='mt-1 mr-2' />
                                        <p>{userSelected? "Guardar cambios" : "Registrar"}</p>
                                    </div> 
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