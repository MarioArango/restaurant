import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import currency from 'currency-formatter'
import { Row, Col, Drawer, List, Skeleton, Avatar, Button, Popconfirm, Divider, Modal} from 'antd'
import { PlusOutlined, MinusOutlined, DeleteTwoTone} from '@ant-design/icons';
import { SendOutlined } from '@ant-design/icons'
import { currencyFE, dateFormatList } from '../../util/config'
import { 
    rxGenerateOrder,
    rxShowOrderSummary,
    rxOrderSummary,
    rxOrderSummaryTotal
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
    loadingGenerateOrder,
    orderSummaryTotal
  } = useSelector(state => state.get("orders"))

  const { authSucursal, typeService, numberTable } = useSelector(state => state.get("users"));
  const { initService } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch()

   const handleSendOrder = () => {
        Modal.confirm({
            centered: true,
            title: "Mensaje de Confirmación",
            content: <p>¿Desea generar el pedido?</p>,
            okText: "Sí",
            cancelText: "Cancelar",
            cancelButtonProps: { type: "text" },
            onOk: () => {
                const orderFormat = orderSummary.map(o => ({
                    nPriceTotal: calculatePriceTotalByDish(o), 
                    nQuantityTotal: o.nQuantity,
                    nIdDish: o.nIdDish,
                    sName: o.sName,
                    nPrice: o.nPrice,
                    sPhoto: o.sPhoto,
                    sType: o.sType
                }))
        
                let orderToSend = {
                    dInitService: initService[0]?.dInitService,
                    nNumberDiners: initService[0]?.nNumberDiners,
                    dCreated: moment().format(dateFormatList[2]),
                    sState: 'pending',
                    sTypeService: typeService,
                    nIdBranchOffice: authSucursal.nIdBranchOffice,
                    dishes: orderFormat
                }
                if(typeService === "mesa"){
                    orderToSend = {
                        ...orderToSend,
                        nNumberTable: parseInt(numberTable)
                    }
                }
                dispatch(rxGenerateOrder(orderToSend, (nIdOrder) => {
                    const orderAddDb = {
                        nIdOrder,
                        ...orderToSend,
                    }
                    const orderSummaryTotal = JSON.parse(localStorage.getItem('orderSummaryTotal'))?? [];
                    localStorage.setItem('orderSummaryTotal', JSON.stringify([...orderSummaryTotal, orderAddDb]));
                    dispatch(rxOrderSummaryTotal(orderAddDb))
                }))
            },
            onCancel: () => { }
        })
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

   const calculatePriceTotalByDishTotal = (dish) => {
    return Number(dish.nPrice)*Number(dish.nQuantityTotal)
   } 

   const calculatePriceTotalOrder = () => {
    let priceTotal = 0;
    orderSummary.forEach(o => {
        priceTotal += Number(o.nPrice)*Number(o.nQuantity)
    })
    return priceTotal
   }

   const calculatePriceTotalOrderTotal = () => {
    let priceTotal = 0;
    orderSummaryTotal.forEach(os => {
        os.dishes?.forEach(d => {
            priceTotal += Number(d.nPriceTotal)
        })
    })
    return priceTotal
   }

   const calculateTotalWidthNewOrder = () => {
    const totalNewOrder = calculatePriceTotalOrder()?? 0;
    const totalOrderConsumida = calculatePriceTotalOrderTotal()?? 0

    return "S/." + (currency.format(Number(totalNewOrder) + Number(totalOrderConsumida), currencyFE)?? "0.00")
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
                    <div className='font-bold text-xl'>
                        {calculateTotalWidthNewOrder()}
                    </div>
                </div>
                <Col span={24}>
                    <Button type="primary" loading={loadingGenerateOrder} className="bg-primary" block onClick={handleSendOrder}>
                        <div className='flex justify-center'>
                            <SendOutlined className='mt-1 mr-2'/>
                            <p>Enviar</p>
                        </div>
                    </Button>
                </Col>
            </div>
        }
      >
        <Row gutter={12}>
            <Col span={24}>
                {
                    orderSummaryTotal?.length > 0 &&
                    <>
                        <p className='font-bold text-base'>Consumido</p>
                        {
                            orderSummaryTotal.map((os, index) => {
                            return <List
                                        key={index}   
                                        loading={false}
                                        itemLayout="horizontal"
                                        dataSource={os.dishes}
                                        renderItem={(dish, index) => (
                                            <List.Item key={index} className="bg-blue-100">
                                                <Skeleton avatar title={false} loading={false} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={dish.sPhoto} size="large" />}
                                                        title={<strong>{dish.sName}</strong>}
                                                        description={dish.nQuantityTotal + "und."}
                                                    />
                                                    <div className='pr-1'>S/. {dish.nPrice ? currency.format(calculatePriceTotalByDishTotal(dish), currencyFE) : '0.00'}</div>
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    />
                            })
                        }
                        {
                        <div className='flex justify-end px-2 mb-3'>
                            <div className='font-bold text-base'>S/. {calculatePriceTotalOrderTotal() ? currency.format(Number(calculatePriceTotalOrderTotal()), currencyFE) : '0.00'}</div>
                        </div>
                        }
                        {
                            orderSummary?.length > 0 && (
                            <>
                                <Divider/>
                                <p className='font-bold text-base'>Nuevo pedido</p>
                            </>
                            )
                        }
                    </>
                }
                {
                    orderSummary?.length > 0 &&
                    <>
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
                        <div className='flex justify-end px-2 mb-3'>
                            <div className='font-bold text-base'>S/. {calculatePriceTotalOrder() ? currency.format(Number(calculatePriceTotalOrder()), currencyFE) : '0.00'}</div>
                        </div>
                    </>
                }
                
            </Col>
            <Divider/>
        </Row>
      </Drawer>
  )
}

export default OrderSummary;