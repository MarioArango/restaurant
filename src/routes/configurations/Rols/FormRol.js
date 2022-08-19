import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RedoOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input, Button, Tree, Drawer, Tooltip, Select, Menu, Dropdown } from 'antd';
import { requiredField } from '../../../util/config';
import { rolesDefault } from '../../../util/rolesDefault';
import { rols } from './rols';
import { rxRegisterRol, rxUpdateRol, rxShowFormRol } from '../../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;

const FormRol = () => {
  const [ permissions, setPermissions  ] = useState([]);

  const {
      showFormRol,
      rolSelected,
      loadingCreateRol,
      loadingUpdateRol
  } = useSelector(state => state.get("rols")); 
    
  const dispatch = useDispatch();

  //TODO: METHODS INHERED FROM ANTD
  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: REGISTER ROL
  const handleSubmit = () => {
      validateFields().then((values) => {
        const rol = {
            sRol: values.sRol,
            sPermissions: JSON.stringify(permissions)
        }
        if(rolSelected){
          dispatch(rxUpdateRol(rolSelected.nIdRol, rol, () => {
              resetFields()
          }))
        }else {
          dispatch(rxRegisterRol(rol, () => {
              resetFields()
          }))
        }
      })
  }
  //TODO: CLOSE FORM ROL
  const handleClose = () => {
    dispatch(rxShowFormRol(false))
  }

  //TODO: CHECK PERMISSION
  const onCheck = (_, info) => {
    const keysPermissions = info?.checkedNodes?.map(p => p.key);
    setPermissions(keysPermissions);
  }

  const handleReturnPermDefault = (value) => {
    setPermissions(rolesDefault[value])
  }

  //TODO: ONLY EDIT
  useEffect(() => {
    if(rolSelected && showFormRol){
        setFieldsValue({ sRol: rolSelected.sRol });
        setPermissions(JSON.parse(rolSelected.sPermissions));
    }
    // eslint-disable-next-line
  }, [rolSelected])

  return (
    <>
        {
            showFormRol && (
            <Drawer
              title={rolSelected? 
                  <div className='flex justify-start'>
                      <UserOutlined className='mt-1 mr-2'/>
                      <p>Editar Rol</p>
                  </div> : 
                  <div className='flex justify-start'>
                      <UserOutlined className='mt-1 mr-2'/>
                      <p>Registrar Rol</p>
                  </div>
              }
              visible={showFormRol}
              bodyStyle={{ padding: 10 }}
              onClose={handleClose}
              destroyOnClose
              placement="right"
              closable={false}
              footer={
                  <Button
                      htmlType='submit'
                      type='primary' 
                      className='bg-primary' 
                      block
                      loading={loadingCreateRol || loadingUpdateRol}
                      onClick={handleSubmit}
                  >
                      <div className='flex justify-center'>
                          <SaveOutlined className='mt-1 mr-2' />
                          <p>{rolSelected? "Guardar cambios" : "Registrar"}</p>
                      </div> 
                  </Button>
              }
            >
              <Form
                  name='form-rols'
                  form={form}
                  layout="vertical"
              >
                  <Row gutter={12}>
                      <Col span={24}>
                          <Item label="Nombre del Rol" name="sRol" rules={requiredField}>
                              <Input/>
                          </Item>
                      </Col>
                      <Col span={24}>
                          <Item 
                            label={
                              <div className='flex justify-between items-center'>
                                <div className='mr-2'>Permisos asignados</div>
                                <Tooltip title="Retornar a los valores por defecto.">
                                  <Dropdown.Button
                                    size='small'
                                    overlay={
                                      <Menu
                                        items={[
                                          {
                                            key: "1",
                                            label: "administrador",
                                            onClick: () => handleReturnPermDefault("administrador")
                                          },
                                          {
                                            key: "2",
                                            label: "cliente",
                                            onClick: () => handleReturnPermDefault("cliente")
                                          },
                                          {
                                            key: "3",
                                            label: "mozo",
                                            onClick: () => handleReturnPermDefault("mozo")
                                          },
                                          {
                                            key: "4",
                                            label: "chef",
                                            onClick: () => handleReturnPermDefault("chef")
                                          },
                                          
                                        ]}
                                      />
                                    }
                                    placement="bottomLeft"
                                    icon={<RedoOutlined/>}
                                  >
                                  </Dropdown.Button>
                                </Tooltip>
                              </div>
                            } 
                            name="sPermissions"
                          >
                              <Tree
                                defaultExpandAll
                                checkable
                                checkedKeys={permissions}
                                onCheck={onCheck}
                                treeData={rols}
                                showIcon
                                checkStrictly
                                blockNode
                              />
                          </Item>
                      </Col>
                  </Row>
              </Form>
            </Drawer>
            )
        }
    </>
  )
}

export default FormRol;