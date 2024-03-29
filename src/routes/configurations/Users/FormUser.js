import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button, Select} from 'antd';
import { requiredField } from '../../../util/config';
import { rxRegisterUser, rxUpdateUser, rxShowFormUser, rxGetBranchOffices, rxGetRols} from '../../../appRedux/actions';

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
    loadingListRols,
    listRols
  } = useSelector(state => state.get("rols"));

  const { 
      loadingListBranchOff,
      listBranchOffices,
    //   showFormBranchOffice,
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
            sRol: listRols.filter(r => r.nIdRol === values.nIdRol)[0]?.sRol?? "",
            nIdRol: values.nIdRol,
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
            sPassword: atob(userSelected.sPassword),
            nIdRol: userSelected.nIdRol,
            sBranchOffices: userSelected.sBranchOfficesAssigned?.map(bo => bo.nIdBranchOffice)
        })
    }
    // eslint-disable-next-line
  }, [userSelected])

   //TODO: INIT - GET ALL BRANCHOFFICES
   useEffect(() => {
    dispatch(rxGetBranchOffices());
    dispatch(rxGetRols());
    // eslint-disable-next-line
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
                        onFinish={handleSubmit}
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
                                <Item label="Rol" name="nIdRol" rules={requiredField}>
                                    <Select
                                        placeholder="Seleccione"
                                        loading={loadingListRols}
                                    >
                                        {
                                            listRols?.map((r, index) => (
                                                <Option key={index} value={r.nIdRol}>
                                                    {r.sRol}
                                                </Option>
                                            ))
                                        }
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