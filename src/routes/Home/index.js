import { useState, useEffect} from 'react'
import { Row, Col, Card, Button, message, Badge, Affix, BackTop } from 'antd'
import { PlusOutlined, MinusOutlined, UpCircleTwoTone } from '@ant-design/icons';
import currency from 'currency-formatter';
import { cardProps, currencyFE } from '../../util/config'
import { rxGetDishes } from '../../apis'
import OrderSummary from './OrderSummary';

const Home = () => {
  const [listDishes, setListDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [visibleOrder, setVisibleOrder] = useState(false);

  //TODO: GET ALL DISHES 
  const getDishes = () => {
    rxGetDishes((querySnapshot) => {
        const dishes = []
        querySnapshot.forEach(doc => {
            dishes.push({...doc.data(), nIdDish: doc.id}) 
        })
        setListDishes(dishes)
    })
  }

  //TODO: SHOW ORDER SUMMARY
  const handleGenerateOrder = () => {
    if(orders.length){
        setVisibleOrder(true)
    }else {
        setVisibleOrder(false)
        message.info("No tiene platos elegidos.")
    }
  }
  
  //TODO: ADD DISH TO ORDER
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
 
  //TODO: DELETE DISH TO ORDER
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
        if(result.length === 0){
            setVisibleOrder(false)
        }
        setOrders(result)
    } 
  }

  //TODO: QUANTITY TOTAL BY DISH
  const quantityByDish = (dish) => {
    const orderMatch = orders.filter(o => o.nIdDish === dish.nIdDish)
    return orderMatch[0]?.nQuantity?? 0
  }

  //TODO: DISABLED BUTTON DELETE DISH
  const disabledDelete = (dish) => {
    const orderMatch = orders.filter(o => o.nIdDish === dish.nIdDish)
    return orderMatch.length === 0 ? true : orderMatch[0].nQuantity === 0? true : false
  }

  //TODO: INIT - GET ALL DISHES FOR CLIENTS
   useEffect(() => {
       getDishes();
   }, [])

  return (
    <>
        <Affix offsetTop={20}>
            <Button type='primary' className='bg-primary' onClick={handleGenerateOrder}>Generar Pedido</Button>
        </Affix>
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
                                <Button type='primary' className='bg-primary' block onClick={() => handleAddQtyDish(d)}>
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
            <BackTop>
                <UpCircleTwoTone/>
            </BackTop>
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
    
    </>
  )
}

export default Home;