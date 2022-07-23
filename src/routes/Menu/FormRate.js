import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Rate, Input, Form, Modal} from 'antd';
import { SendOutlined,  } from '@ant-design/icons';

import { rxShowRate, rxSendRate } from '../../appRedux/actions';

const { Item } = Form;
const { TextArea } = Input;

const FormRate = () => {
  const { 
      authSucursal, 
      typeService, 
      numberTable,
      loadingSendRate
  } = useSelector(state => state.get("users"));

  const { showRate } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const handleSaveRate = () => {
    validateFields().then((values) => {
        console.log(values, "values")
        const rate = {
            authSucursal, 
            typeService, 
            numberTable,
            sCommentRate: values.sCommentRate,
            nRate: values.nRate
        }
        // dispatch(rxSendRate(rate, () => {
        //     resetFields()
        // }))
    })
  }

  const handleCancelRate = () => {
    dispatch(rxShowRate(false));
  }

  return (
    <Modal
        title="Ayudenos a mejorar, dejenos su comentario"
        visible={showRate}
        bodyStyle={{ padding: 10 }}
        width="350px"
        onCancel={handleCancelRate}
        footer={null}
        maskClosable={false}
        destroyOnClose
        loading={loadingSendRate}
    >
        <Form
            name="form-save-rate"
            form={form}
            onFinish={handleSaveRate}
            layout="vertical"
        >   
            <Row gutter={12}>
                <Col span={24}>
                    <Item name="sCommentRate">
                        <TextArea rows={4} maxLength={100}/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item name="nRate">
                        <Rate allowHalf/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item name="nRate">
                        <Button htmlType='submit' type='primary' className='bg-primary' block>
                            <div className='flex justify-center'>
                                <SendOutlined className='mt-1 mr-2'/>
                                <p>Enviar</p>
                            </div>
                        </Button>
                    </Item>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default FormRate;