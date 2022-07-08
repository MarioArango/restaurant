import React from 'react'
import currency from 'currency-formatter'
import { Row, Col, Modal, List, Skeleton, Avatar, Button } from 'antd'
import { PlusOutlined, MinusOutlined} from '@ant-design/icons';
import { SendOutlined } from '@ant-design/icons'
import { currencyFE } from '../../util/config'

const OrderSummary = (props) => {
   const {
    visibleOrder,
    setVisibleOrder,
    orders,
    setOrders,
    quantityByDish,
    handleAddQtyDish,
    handleDelQtyDish
   } = props

   const handleCancel = () => {
    setVisibleOrder(false)
   }
   console.log(orders, "orders")

   const handleSendOrder = () => {
    setOrders([])
    setVisibleOrder(false)
   }

  return (
    <Modal
        visible={visibleOrder}
        title="Resumen de Pedido"
        bodyStyle={{ paddingBlock: 0 }}
        width="75%"
        onCancel={handleCancel}
        maskClosable={false}
        destroyOnClose
        loading={false}
        footer={[
            <Button type='primary' onClick={handleSendOrder}>
                <SendOutlined />Enviar
                </Button>
        ]}
    >
        <Row gutter={12}>
            <Col xs={24} md={24} sm={24} lg={12}>
                <List
                    loading={false}
                    itemLayout="horizontal"
                    dataSource={orders}
                    renderItem={(dish, index) => (
                        <List.Item
                            key={index}
                            actions={[
                                <Button 
                                    shape="circle" 
                                    icon={<MinusOutlined key="del"/>} 
                                    onClick={() => handleDelQtyDish(dish)} 
                                    key="del"
                                >
                                </Button>,
                                <Button 
                                    type="primary"
                                    shape="circle" 
                                    icon={<PlusOutlined key="add" />} 
                                    onClick={() => handleAddQtyDish(dish)} 
                                    key="add"
                                >
                                </Button>
                                
                            ]}
                        >
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                avatar={<Avatar src={dish.sPhoto} size="large" />}
                                title={dish.sName}
                                description={quantityByDish(dish) + "und."}
                                />
                                <div>S/. {dish.nPrice ? currency.format(Number(dish.nPrice), currencyFE) : '0.00'}</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    </Modal>
  )
}

export default OrderSummary