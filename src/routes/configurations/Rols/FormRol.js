import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChartOutlined, CoffeeOutlined, PlusOutlined, ProfileOutlined, SaveOutlined, SettingOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button, Select, Collapse, Tree, Drawer} from 'antd';
import { requiredField } from '../../../util/config';
import { rxRegisterRol, rxUpdateRol, rxShowFormRol } from '../../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;

const FormRol = () => {
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
        console.log(values)
        // const rol = {
        //     sRol: values.sRol,
        //     sPermissions: values.sPermissions,
        // }
        // if(rolSelected){
        //   dispatch(rxUpdateRol(rolSelected.nIdRol, rol, () => {
        //       resetFields()
        //   }))
        // }else {
        //   dispatch(rxRegisterRol(rol, () => {
        //       resetFields()
        //   }))
        // }
      })
  }
  //TODO: CLOSE FORM ROL
  const handleClose = () => {
    dispatch(rxShowFormRol(false))
  }

  //TODO: CHECK PERMISSION
  const onCheck = (_, info) => {
    console.log('info', info);
  };

  //TODO: LIST PERMISSIONS
  const treeData = [
    {
      title: 'Menu',
      key: 'menu',
      children: [
        {
          title: 'Pedir cuenta',
          key: 'menu.request-payment',
        },
        {
          title: 'Solicitar mozo',
          key: 'menu.request-waiter',
        },
        {
          title: 'Iniciar servicio',
          key: 'menu.init-service',
        }
      ]
    },
    {
        title: 'Pedidos',
        key: 'orders',
        children: [
          {
            title: 'Atender orden',
            key: 'orders.attend-order',
          },
        ]
    },
    {
        title: 'Platos',
        key: 'dishes',
        children: [
          {
            title: 'Agregar',
            key: 'dishes.add',
          },
          {
            title: 'Editar',
            key: 'dishes.edit',
          },
          {
            title: 'Eliminar',
            key: 'dishes.delete',
          },
        ],
    },
    {
        title: 'Reportes',
        key: 'reports',
        children: [
          {
            title: 'Tiempo Pedidos',
            key: 'reports.time-orders',
            children: [
                {
                    title: "Excel",
                    key: "reports.time-orders.export-excel"
                }
            ]
          },
          {
            title: 'Puntuaciones',
            key: 'reports.rates',
            children: [
                {
                    title: "Excel",
                    key: "reports.rates.export-excel"
                }
            ]
          },
          {
            title: 'Ventas',
            key: 'reports.sales',
            children: [
                {
                    title: "Excel",
                    key: "reports.sales.export-excel"
                }
            ]
          },
        ],
    },
    {
        title: 'Configuración',
        key: 'configurations',
        children: [
          {
            title: 'Sucursales',
            key: 'configurations.branchoffices',
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.branchoffices.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.branchoffices.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.branchoffices.delete',
                },
              ]
          },
          {
            title: 'Roles',
            key: 'rols',
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.rols.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.rols.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.rols.delete',
                },
              ],
          },
          {
            title: 'Usuarios',
            key: 'users',
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.users.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.users.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.users.delete',
                },
              ],
          },
          {
            title: "Tipo de productos",
            key: "types-products",
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.ypes-products.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.ypes-products.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.ypes-products.delete',
                },
              ],
          }
        ],
    },
  ]

  //TODO: ONLY EDIT
  useEffect(() => {
    if(rolSelected && showFormRol){
        setFieldsValue({
            sRol: rolSelected.sRol,
            sPermissions: rolSelected.sPermissions,
        })
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
                        className='gx-form-row0'
                        layout="vertical"
                    >
                        <Row gutter={12}>
                            <Col span={24}>
                                <Item label="Nombre del Rol" name="sRol" rules={requiredField}>
                                    <Input/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Permisos asignados" name="sPermissions">
                                    <Tree
                                        defaultExpandAll
                                        checkable
                                        //PERMISOS POR DEFAULT, PARA CONFIGURAR ROLES 
                                        // defaultExpandedKeys={['0-0-0', '0-0-1']}
                                        // defaultSelectedKeys={['0-0-0', '0-0-1']}
                                        // defaultCheckedKeys={['0-0-0', '0-0-1']}
                                        onCheck={onCheck}
                                        treeData={treeData}
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