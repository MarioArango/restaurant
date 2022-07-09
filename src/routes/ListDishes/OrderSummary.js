import React, { useState } from 'react'
import moment from 'moment'
import currency from 'currency-formatter'
import { Row, Col, Modal, List, Skeleton, Avatar, Button, Popconfirm, Divider} from 'antd'
import { PlusOutlined, MinusOutlined, DeleteOutlined} from '@ant-design/icons';
import { SendOutlined } from '@ant-design/icons'
import { currencyFE, dateFormatList } from '../../util/config'
import { rxGenerateOrder } from '../../apis';

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

   const [loadingGenOrder, setLoadingGenOrder] = useState(false)

   const handleSendOrder = () => {
        const orderInit = orders.map(o => ({
            priceTotal: calculatePriceTotalByDish(o), 
            state: 'pending',
            created: moment().format(dateFormatList[2]),
            nQuantity: o.nQuantity,
            dish: {
                nIdDish: o.nIdDish,
                nPrice: o.nPrice,
                sName: o.sName,
                sPhoto: o.sPhoto,
                sType: o.sType
            }
        }))

        console.log(order, "order")
        setLoadingGenOrder(true)
        // rxGenerateOrder(order, () => {
        //     setLoadingGenOrder(false)
        //     setOrders([])
        //     setVisibleOrder(false)
        // })
   }

   const handleDelTotalQtyDish = (dish) => {
    const ordersUp = orders.filter(o => o.nIdDish !== dish.nIdDish)
    if(ordersUp.length === 0){
        setVisibleOrder(false)
    }
    setOrders(ordersUp)
   }

   const handleCancel = () => {
    setVisibleOrder(false)
   }

   const calculatePriceTotalByDish = (dish) => {
    return Number(dish.nPrice)*Number(dish.nQuantity)
   } 

   const calculatePriceTotalOrder = () => {
    let priceTotal = 0;
    orders.forEach(o => {
        priceTotal += Number(o.nPrice)*Number(o.nQuantity)
    })
    return priceTotal
   } 
   console.log(orders, "orders")

   return (
    <Modal
        visible={visibleOrder}
        title="Resumen de Pedido"
        bodyStyle={{ paddingBlock: 0 }}
        width="75%"
        onCancel={handleCancel}
        maskClosable={false}
        destroyOnClose
        loading={loadingGenOrder}
        footer={[
            <Popconfirm placement="top" title='¿Desea generar el pedido?' onConfirm={handleSendOrder} okText="Sí" cancelText="No">
                <Button icon={<SendOutlined />} type='primary'>
                    Enviar
                </Button>
            </Popconfirm>
        ]}
    >
        <Row gutter={12}>
            <Col span={24}>
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
                                    icon={<MinusOutlined/>} 
                                    onClick={() => handleDelQtyDish(dish)} 
                                    key="del"
                                />,
                                <Button 
                                    type="primary"
                                    shape="circle" 
                                    icon={<PlusOutlined/>} 
                                    onClick={() => handleAddQtyDish(dish)} 
                                    key="add"
                                />,
                                <Popconfirm 
                                    placement="top" 
                                    title='¿Eliminar plato?' 
                                    onConfirm={() => handleDelTotalQtyDish(dish)} 
                                    okText="Sí" 
                                    cancelText="No"
                                >
                                    <Button 
                                        shape="circle" 
                                        icon={<DeleteOutlined/>} 
                                        key="del-total"
                                    />
                                </Popconfirm>
                            ]}
                        >
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={dish.sPhoto} size="large" />}
                                    title={dish.sName}
                                    description={quantityByDish(dish) + "und."}
                                />
                                <div>S/. {dish.nPrice ? currency.format(calculatePriceTotalByDish(dish), currencyFE) : '0.00'}</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Col>
            <Divider/>
            <Col span={8}>
                <strong>TOTAL:</strong>
            </Col>
            <Col span={16}>
                <strong>S/. {calculatePriceTotalOrder() ? currency.format(Number(calculatePriceTotalOrder()), currencyFE) : '0.00'}</strong>
            </Col>
        </Row>
    </Modal>
  )
}

export default OrderSummary