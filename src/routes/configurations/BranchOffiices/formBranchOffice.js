import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, ShopOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Button } from 'antd';
import { requiredField } from '../../../util/config';
import { rxRegisterBranchOffice, rxUpdateBranchOffice, rxShowFormBranchOff } from '../../../appRedux/actions';

const { Item } = Form;

const FormBranchOffice = () => {
    const {
        showFormBranchOffice,
        branchOfficeSelected,
        loadingCreateBranchOff,
        loadingUpdateBranchOff
    } = useSelector(state => state.get("branchOffices"));

    const dispatch = useDispatch();

  //TODO: METHODS INHERED FROM ANTD
  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: REGISTER BRANCH OFFICE
  const handleSubmit = () => {
      validateFields().then((values) => {
          const branchOffice = {
            sBranchOffice: values.sBranchOffice
          }
          if(branchOfficeSelected){
            dispatch(rxUpdateBranchOffice(branchOfficeSelected.nIdBranchOffice, branchOffice, () => {
                resetFields()
            }))
          }else {
            dispatch(rxRegisterBranchOffice(branchOffice, () => {
                resetFields()
            }))
          }
      })
  }
  //TODO: CLOSE FORM BRANCHOFFICE
  const handleCancel = () => {
    dispatch(rxShowFormBranchOff(false))
  }

  //TODO: ONLY EDIT
  useEffect(() => {
    if(branchOfficeSelected && showFormBranchOffice){
        setFieldsValue({
            sBranchOffice: branchOfficeSelected.sBranchOffice
        })
    }
    // eslint-disable-next-line
  }, [branchOfficeSelected])

  return (
    <>
        {
            showFormBranchOffice && (
            <Modal
                    title={branchOfficeSelected? 
                        <div className='flex justify-start'>
                            <ShopOutlined className='mt-1 mr-2'/>
                            <p>Editar Sucursal</p>
                        </div> : 
                        <div  className='flex justify-start'>
                            <ShopOutlined className='mt-1 mr-2'/>
                            <p>Registrar Sucursal</p>
                        </div>
                    }
                    visible={showFormBranchOffice}
                    bodyStyle={{ padding: 10 }}
                    width="350px"
                    onCancel={handleCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose
                    loading={loadingCreateBranchOff || loadingUpdateBranchOff}
                >
                    <Form
                        name='form-branch-office'
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <Row gutter={12}>
                            <Col span={24}>
                                <Item label="Nombre" name="sBranchOffice" rules={requiredField}>
                                    <Input/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Button 
                                    htmlType='submit'
                                    type='primary'
                                    block
                                    loading={loadingCreateBranchOff}
                                >
                                    <div className='flex justify-center'>
                                        <SaveOutlined className='mt-1 mr-2'/>
                                        <p>{branchOfficeSelected? "Guardar cambios" : "Registrar"}</p>
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

export default FormBranchOffice;