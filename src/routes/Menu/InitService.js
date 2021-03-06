import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Modal, Input, Button, Col, Row, Form} from "antd";
import { PlayCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { currencyOnly, dateFormatList, requiredField } from '../../util/config';
import { useAuth } from '../../Hooks/auth';
import { rxShowInitService, rxInitService } from '../../appRedux/actions';

const { Item } = Form;

const InitService = () => {
    const { sRol } = useAuth();

    const { showInitService } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch();

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
        closable={ sRol === "mozo" || sRol === "administrador"? true : false}
        keyboard={ sRol === "mozo" || sRol === "administrador"? true : false}
    >
        <Form
            name="form-init-service"
            form={form}
            onFinish={handleSaveInitService}
            layout="vertical"
        >   
            <Row gutter={12}>
                <Col span={24}>
                    <Item name="nNumberDiners" label="N??mero de comensales" rules={requiredField}>
                        <Input onKeyDown={currencyOnly}/>
                    </Item>
                </Col>
                <Col span={24}>
                    <Button htmlType='submit' type='primary' className='bg-primary' block>
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