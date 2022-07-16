import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import currency from 'currency-formatter'
import { Row, Col, Drawer, List, Skeleton, Avatar, Button, Popconfirm, Divider} from 'antd'
import { PlusOutlined, MinusOutlined, DeleteTwoTone} from '@ant-design/icons';
import { SendOutlined } from '@ant-design/icons'
import { currencyFE, dateFormatList } from '../../util/config'
import { 
    rxGenerateOrder,
    rxShowOrderSummary,
    rxOrderSummary
 } from '../../appRedux/actions';

const OrderSummary = (props) => {
  const {
      quantityByDish,
      handleAddQtyDish,
      handleDelQtyDish
     } = props;
     
  const {
    showOrderSummary,
    orderSummary,
    loadingGenerateOrder
  } = useSelector(state => state.get("orders"))

  const dispatch = useDispatch()

   const handleSendOrder = () => {
        const orderFormat = orderSummary.map(o => ({
            nPriceTotal: calculatePriceTotalByDish(o), 
            nQuantityTotal: o.nQuantity,
            nIdDish: o.nIdDish,
            sName: o.sName,
            nPrice: o.nPrice,
            sPhoto: o.sPhoto,
            sType: o.sType
        }))

        const orderToSend = {
            dCreated: moment().format(dateFormatList[2]),
            sState: 'pending',
            dishes: orderFormat
        }
        dispatch(rxGenerateOrder(orderToSend))
   }

   const handleDelTotalQtyDish = (dish) => {
    const ordersUp = orderSummary.filter(o => o.nIdDish !== dish.nIdDish)
    if(ordersUp.length === 0){
        dispatch(rxShowOrderSummary(false))
    }
    dispatch(rxOrderSummary(ordersUp))
   }

   const handleCancel = () => {
    dispatch(rxShowOrderSummary(false))
   }

   const calculatePriceTotalByDish = (dish) => {
    return Number(dish.nPrice)*Number(dish.nQuantity)
   } 

   const calculatePriceTotalOrder = () => {
    let priceTotal = 0;
    orderSummary.forEach(o => {
        priceTotal += Number(o.nPrice)*Number(o.nQuantity)
    })
    return priceTotal
   } 

   return (
    <Drawer
        title="Resumen de Pedido"
        placement="right"
        closable={false}
        onClose={handleCancel}
        visible={showOrderSummary}
        key="right"
        footer={
            <div>
                <div className='flex justify-between px-2 mb-3'>
                    <div className='font-bold text-xl'>TOTAL:</div>
                    <div className='font-bold text-xl'>S/. {calculatePriceTotalOrder() ? currency.format(Number(calculatePriceTotalOrder()), currencyFE) : '0.00'}</div>
                </div>
                <Col span={24}>
                    <Popconfirm placement="top" title='¿Desea generar el pedido?' onConfirm={handleSendOrder} okText="Sí" cancelText="No">
                        <Button
                            type="primary" 
                            icon={<SendOutlined />}
                            loading={loadingGenerateOrder}
                            className="bg-primary"
                            block
                        >
                            Enviar
                        </Button>
                    </Popconfirm>
                </Col>
            </div>
        }
      >
        <Row gutter={12}>
            <Col span={24}>
                <List
                    loading={false}
                    itemLayout="horizontal"
                    dataSource={orderSummary}
                    renderItem={(dish, index) => (
                        <List.Item key={index}>
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={dish.sPhoto} size="large" />}
                                    title={<strong>{dish.sName}</strong>}
                                    description={quantityByDish(dish) + "und."}
                                />
                                <div>S/. {dish.nPrice ? currency.format(calculatePriceTotalByDish(dish), currencyFE) : '0.00'}</div>
                                <div className='flex justify-between'>
                                    <Button 
                                        className='mx-2'
                                        shape="circle" 
                                        icon={<MinusOutlined/>} 
                                        onClick={() => handleDelQtyDish(dish)} 
                                        key="del"
                                    />
                                    <Button 
                                        type="primary"
                                        className='bg-primary mr-2'
                                        shape="circle" 
                                        icon={<PlusOutlined/>} 
                                        onClick={() => handleAddQtyDish(dish)} 
                                        key="add"
                                    />
                                    <Popconfirm 
                                        placement="left" 
                                        title='¿Eliminar plato?' 
                                        onConfirm={() => handleDelTotalQtyDish(dish)} 
                                        okText="Sí"
                                        cancelText="No"
                                    >
                                        <Button 
                                            shape="circle" 
                                            icon={ <DeleteTwoTone twoToneColor="#ed4956"/>}
                                            key="del-total"
                                        />
                                    </Popconfirm>
                                </div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Col>
            <Divider/>
        </Row>
      </Drawer>
  )
}

export default OrderSummary;