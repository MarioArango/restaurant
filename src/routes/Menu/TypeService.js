import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Row, Col, Checkbox, Input, Button} from "antd";
import {rxSetTypeService, rxShowTypeService} from '../../appRedux/actions';
import { SaveOutlined } from '@ant-design/icons';

const { Item } = Form;

const TypeService = () => {

  const { authSucursal, showTypesService, typeService} = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { validateFields } = form;

  const handleCancelModalTS = () => {
    dispatch(rxSetTypeService(null))
    dispatch(rxShowTypeService(false))
  }

  const handleSetTypeService = () => {
    validateFields().then((values) => {
        rxSetTypeService()
    })
  }

  return (
    <Modal
        title="Seleccion el tipo de servicio"
        visible={showTypesService}
        bodyStyle={{ padding: 10 }}
        width="350px"
        onCancel={handleCancelModalTS}
        footer={null}
        maskClosable={false}
        destroyOnClose
    >
        <Form
             name="form-type-service"
            form={form}
            onFinish={handleSetTypeService}
            layout="vertical"
        > 
            <Row gutter={12}>
                <Col span={24}>
                    <Item label="Barra" name="sBar">
                        <Checkbox/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item label="Mesa" name="sTable">
                        <Checkbox/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item>
                        <Input/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item>
                        <Button htmlType='submit' type="primary" className='bg-primary' block>
                            <div className='flex justify-center'>
                                <SaveOutlined className="mt-1 mr-2"/>
                                <p>Guardar</p>
                            </div>
                        </Button>
                    </Item>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default TypeService;