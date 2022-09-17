import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, TagOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button } from 'antd';
import { requiredField } from '../../../util/config';
import { rxRegisterTypeProduct, rxUpdateTypeProduct, rxShowFormTypeProduct } from '../../../appRedux/actions';

const { Item } = Form;

const FormTypesProduct = () => {
    const {
        showFormTypeProduct,
        typeProductSelected,
        loadingCreateTypeProduct,
        loadingUpdateTypeProduct
    } = useSelector(state => state.get("typesProducts"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: METHODS INHERED FROM ANTD
  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: REGISTER BRANCH OFFICE
  const handleSubmit = () => {
      validateFields().then((values) => {
          const typeProduct = {
            sTypeProduct: values.sTypeProduct,
            nIdBranchOffice: authSucursal.nIdBranchOffice
          }
          if(typeProductSelected){
            dispatch(rxUpdateTypeProduct(typeProductSelected.nIdTypeProduct, typeProduct, () => {
                resetFields()
            }))
          }else {
            dispatch(rxRegisterTypeProduct(typeProduct, () => {
                resetFields()
            }))
          }
      })
  }
  //TODO: CLOSE FORM TYPE PRODUCT
  const handleCancel = () => {
    dispatch(rxShowFormTypeProduct(false))
  }

  //TODO: ONLY EDIT
  useEffect(() => {
    if(typeProductSelected && showFormTypeProduct){
        setFieldsValue({
            sTypeProduct: typeProductSelected.sTypeProduct
        })
    }
    // eslint-disable-next-line
  }, [typeProductSelected])

  return (
    <>
        {
            showFormTypeProduct && (
            <Modal
                    title={typeProductSelected? 
                        <div className='flex justify-start'>
                            <TagOutlined className='mt-1 mr-2'/>
                            <p>Editar</p>
                        </div> : 
                        <div  className='flex justify-start'>
                            <TagOutlined className='mt-1 mr-2'/>
                            <p>Registrar</p>
                        </div>
                    }
                    visible={showFormTypeProduct}
                    bodyStyle={{ padding: 10 }}
                    width="350px"
                    onCancel={handleCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose
                    loading={loadingCreateTypeProduct || loadingUpdateTypeProduct}
                >
                    <Form
                        name='form-branch-office'
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <Row gutter={12}>
                            <Col span={24}>
                                <Item label="Tipo de producto" name="sTypeProduct" rules={requiredField}>
                                    <Input/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Button 
                                    htmlType='submit'
                                    type='primary' 
                                    block
                                    loading={loadingCreateTypeProduct}
                                >
                                    <div className='flex justify-center'>
                                        <SaveOutlined className='mt-1 mr-2'/>
                                        <p>{typeProductSelected? "Guardar cambios" : "Registrar"}</p>
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

export default FormTypesProduct;