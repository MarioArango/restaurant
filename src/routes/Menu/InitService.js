import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Modal, Button, Col, Row, Form, InputNumber} from "antd";
import { PlayCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { dateFormatList, numbersOnly, requiredField } from '../../util/config';
import { usePermission } from '../../Hooks/usePermission';
import { rxShowInitService, rxInitService } from '../../appRedux/actions';

const { Item } = Form;

const InitService = () => {

  const { showInitService } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch();

  const permInitService = usePermission("menu.init-service");

  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const handleSaveInitService = () => {
    validateFields().then((values) => {
        const initServ = {
            nNumberDiners: values.nNumberDiners,
            dInitService: moment().format(dateFormatList[2])
        }
        localStorage.setItem("initService", JSON.stringify([initServ]));
        dispatch(rxInitService(initServ));
        handleCancelModal();
    })
  }

  const handleCancelModal = () => {
    dispatch(rxShowInitService(false))
    resetFields()
  }

  return (
    <Modal
        title={
            <div className='flex justify-start'>
                <PlayCircleOutlined className="mt-1 mr-2"/>
                <p>Iniciar servicio</p>
            </div>
        }
        visible={showInitService}
        bodyStyle={{ padding: 10 }}
        width="350px"
        onCancel={handleCancelModal}
        footer={null}
        maskClosable={false}
        destroyOnClose
        centered
        closable={permInitService}
        keyboard={permInitService}
    >
        <Form
            name="form-init-service"
            form={form}
            onFinish={handleSaveInitService}
            layout="vertical"
        >   
            <Row gutter={12}>
                <Col span={24}>
                    <Item name="nNumberDiners" label="Número de comensales" rules={requiredField}>
                        <InputNumber onKeyDown={numbersOnly} min={1} max={20} className="w-full"/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Button htmlType='submit' type='primary' block>
                        <div className='flex justify-center'>
                            <SaveOutlined className='mt-1 mr-2'/>
                            <p>Iniciar</p>
                        </div>
                    </Button>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default InitService;