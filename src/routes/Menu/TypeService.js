import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Col, Row, message, InputNumber} from "antd";
import { AuditOutlined, SaveOutlined } from '@ant-design/icons';
import { numbersOnly } from '../../util/config';
import { 
    rxClearAllOrderSummary, 
    rxSetNumberTable,
    rxShowTypeService
} from '../../appRedux/actions';

const TypeService = () => {
  const [numberTable, setNumberTable] = useState(null);

  const { showTypesService } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const handleSaveTypeService = () => {
    if(numberTable){
        serviceToSave()
    }else {
        message.info("Ingrese el número de mesa")
    }
  }

  const serviceToSave = () => {
    localStorage.setItem("numberTable", numberTable);

    dispatch(rxClearAllOrderSummary());
    dispatch(rxSetNumberTable(numberTable));
    dispatch(rxShowTypeService(false));
  }

  const handleCancelModalTS = () => {
    dispatch(rxShowTypeService(false))
  }

  return (
    <Modal
        title={
            <div className='flex justify-start'>
                <AuditOutlined className="mt-1 mr-2"/>
                <p>Ingrese en número de Mesa</p>
            </div>
        }
        visible={showTypesService}
        bodyStyle={{ padding: 10 }}
        width="350px"
        onCancel={handleCancelModalTS}
        footer={null}
        maskClosable={false}
        destroyOnClose
        centered
        closable={false}
        keyboard={false}
    >
        <Row gutter={12}>
            <Col span={24} className="mb-3">
                <InputNumber
                    className="w-full"
                    placeholder='Ingrese el número de mesa'
                    onChange={(value) => setNumberTable(value)}
                    value={numberTable}
                    onKeyDown={numbersOnly}
                    min={1}
                    max={20}
                />
            </Col>
            <Col span={24}>
                <Button type="primary" block onClick={handleSaveTypeService}>
                    <div className='flex justify-center'>
                        <SaveOutlined className="mt-1 mr-2"/>
                        <p>Guardar</p>
                    </div>
                </Button>
            </Col>
        </Row>
    </Modal>
  )
}

export default TypeService;