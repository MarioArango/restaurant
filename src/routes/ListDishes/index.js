import { useState, useEffect} from 'react'
import { Row, Col, Card, Button, message, Badge,  } from 'antd'
import { PlusOutlined, MinusOutlined} from '@ant-design/icons';
import currency from 'currency-formatter';
import { cardProps, currencyFE, numbersOnly } from '../../util/config'
import { rxGetDishes } from '../../apis'
import OrderSummary from './OrderSummary';

const ListDishes = () => {
  const [listDishes, setListDishes] = useState([])  
  const [orders, setOrders] = useState([])  
  const [visibleOrder, setVisibleOrder] = useState(false)

  /**
   * --------------
   * GET ALL DISHES 
   * --------------
   */
  const getDishes = () => {
    rxGetDishes((querySnapshot) => {
        const dishes = []
        querySnapshot.forEach(doc => {
            dishes.push({...doc.data(), nIdDish: doc.id}) 
        })
        setListDishes(dishes)
    })
  }

  /**
   * ------
   * ORDER
   * ------
   */
  const handleAddOrder = (dish) => {
    //TODO
    message.success('Agregado')
  }

  const handleGenerateOrder = () => {
    if(orders.length){
        setVisibleOrder(true)
    }else {
        message.info("No tiene platos elegidos.")
    }
  }
  
  const handleAddQtyDish = (dish) => {
    if(orders.length === 0){
        setOrders([{...dish, nQuantity: dish.nQuantity + 1}])
    }else {
        const orderUp = orders.filter(o => o.nIdDish === dish.nIdDish)
        if(orderUp.length === 1){
            const ordUp = {
                ...orderUp[0],
                nQuantity: orderUp[0]?.nQuantity + 1
            }
            const resultOrd = orders.map(o => {
                if(o.nIdDish === ordUp.nIdDish){
                    return {
                        ...ordUp
                    }
                }
                return {
                    ...o
                }
            })
            setOrders(resultOrd)
        }
        if(orderUp.length === 0){
            setOrders([...orders, {...dish, nQuantity: dish.nQuantity + 1}])
        }
    }
  }
 
  const handleDelQtyDish = (dish) => {
    const orderUp = orders.filter(o => o.nIdDish === dish.nIdDish);
    if(orderUp.length === 1 && orderUp[0].nQuantity > 0){
        const ordUp = {
            ...orderUp[0],
            nQuantity: orderUp[0]?.nQuantity - 1
        }
        const resultOrd = orders.map(o => {
            if(o.nIdDish === ordUp.nIdDish){
                return {
                    ...ordUp
                }
            }
            return {
                ...o
            }
        })
        const result = resultOrd.filter(o => o.nQuantity !== 0)
        setOrders(result)
    }
  }

  const quantityByDish = (dish) => {
    const orderMatch = orders.filter(o => o.nIdDish === dish.nIdDish)
    return orderMatch[0]?.nQuantity?? 0
  }

  const disabledDelete = (dish) => {
    const orderMatch = orders.filter(o => o.nIdDish === dish.nIdDish)
    return orderMatch.length === 0 ? true : orderMatch[0].nQuantity === 0? true : false
  }

   useEffect(() => {
       getDishes()
   }, [])

  return (
    <div>
        <div>LISTA DE PLATOS</div>
        <Button type='primary' onClick={handleGenerateOrder}>Generar Pedido</Button>
        <Row gutter={12}>
            <Col xs={24} sm={24} md={12} lg={8}>
                {
                    listDishes?.map((d, index)=> (
                        <Card
                            key={index}
                            {...cardProps}
                            title={d.sName}
                            cover={
                                <Badge count={quantityByDish(d)} color="blue" size="large">
                                    <img
                                        alt="Imagen del plato."
                                        src={d.sPhoto}
                                        width="100%"
                                    />
                                </Badge>
                                
                            }
                            actions={[
                                <Button  block onClick={() => handleDelQtyDish(d)} disabled={disabledDelete(d)}>
                                    <MinusOutlined jey="del"/>
                                </Button>,
                                <Button type='primary' block onClick={() => handleAddQtyDish(d)}>
                                    <PlusOutlined key="add" />
                                </Button>
                            ]}
                        >
                            <Row gutter={12}>
                                <Col span={20}>
                                    <div>S/. {d.nPrice ? currency.format(Number(d.nPrice), currencyFE) : '0.00'}</div>
                                </Col>
                            </Row>
                        </Card>
                    ))
                }
            </Col>
        </Row>
        {
            visibleOrder && orders?.length &&
            <OrderSummary 
                visibleOrder={visibleOrder} 
                setVisibleOrder={setVisibleOrder} 
                orders={orders}
                setOrders={setOrders}
                quantityByDish={quantityByDish}
                handleAddQtyDish={handleAddQtyDish}
                handleDelQtyDish={handleDelQtyDish}
            />
        }
    </div>
  )
}

export default ListDishes