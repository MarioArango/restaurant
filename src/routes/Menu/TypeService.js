import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Input, Button, Radio, Space, Col, Row, message} from "antd";
import { AuditOutlined, SaveOutlined } from '@ant-design/icons';
import { currencyOnly } from '../../util/config';
import { 
    rxClearAllOrderSummary, 
    rxSetNumberTable, 
    rxSetTypeService, 
    rxShowTypeService
} from '../../appRedux/actions';

const TypeService = () => {
    const [valueService, setValueService] = useState(null);
    const [numberTable, setNumberTable] = useState(null);

  const { showTypesService } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const handleSaveTypeService = () => {
    if(valueService === "mesa"){
        if(numberTable){
            serviceToSave()
        }else {
            message.info("Ingrese el número de mesa")
        }
    }else {
        serviceToSave()
    }
  }

  const serviceToSave = () => {
    localStorage.setItem("typeService", valueService);
    localStorage.setItem("numberTable", numberTable);

    dispatch(rxClearAllOrderSummary());
    dispatch(rxSetTypeService(valueService));
    dispatch(rxSetNumberTable(numberTable));
    dispatch(rxShowTypeService(false));
  }

  const handleCancelModalTS = () => {
    dispatch(rxShowTypeService(false))
  }

  const handleChangeTypeService = (e) => {
    setValueService(e.target.value);
    if(e.target.value === "barra"){
        setNumberTable(null)
    }
  }

  return (
    <Modal
        title={
            <div className='flex justify-start'>
                <AuditOutlined className="mt-1 mr-2"/>
                <p>Seleccione el tipo de servicio</p>
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
                <Radio.Group onChange={handleChangeTypeService} value={valueService}>
                    <Space direction="vertical">
                        <Radio value="barra">Barra</Radio>
                        <Radio value="mesa">
                            Mesa
                            {valueService === "mesa" ? (
                                <Input
                                    placeholder='Ingrese el número de mesa'
                                    onChange={(e) => setNumberTable(e.target.value)}
                                    value={numberTable}
                                    style={{
                                        width: 200,
                                        marginLeft: 57,
                                    }}
                                    onKeyDown={currencyOnly}
                                />
                            ) : null}
                        </Radio>
                    </Space>
                </Radio.Group>
            </Col>
            <Col span={24}>
                <Button type="primary" className='bg-primary' block onClick={handleSaveTypeService}>
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