import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Rate, Input, Form, Modal} from 'antd';
import { SendOutlined,  } from '@ant-design/icons';
import { rxShowRate, rxSendRate, rxShowInitService } from '../../appRedux/actions';
import moment from 'moment';
import { dateFormatList } from '../../util/config';

const { Item } = Form;
const { TextArea } = Input;

const FormRate = () => {
  const { authSucursal, numberTable, loadingSendRate, showRate } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const handleSaveRate = () => {
    validateFields().then((values) => {
        let rate = {
            dCreated: moment().format(dateFormatList[2]),
            nIdBranchOffice: authSucursal?.nIdBranchOffice,
            sCommentRate: values.sCommentRate?? "",
            nRate: values.nRate?? 3,
            nNumberTable: numberTable

        }
        dispatch(rxSendRate(rate, () => {
            resetFields();
            dispatch(rxShowRate(false));
            dispatch(rxShowInitService(true));
        }))
    })
  }

  const handleCancelRate = () => {
    dispatch(rxShowRate(false));
    dispatch(rxShowInitService(true));
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
            <Row>
                <Col span={24}>
                    <Item name="sCommentRate" label="Comentario">
                        <TextArea rows={2} maxLength={100}/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Item name="nRate" label="Puntuación">
                        <Rate allowHalf defaultValue={3}/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Button htmlType='submit' type='primary' block>
                        <div className='flex justify-center'>
                            <SendOutlined className='mt-1 mr-2'/>
                            <p>Enviar</p>
                        </div>
                    </Button>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default FormRate;