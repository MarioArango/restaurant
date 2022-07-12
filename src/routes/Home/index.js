import { useState, useEffect} from 'react'
import { Row, Col, Card, Button, message, Badge, Affix, BackTop, Tooltip, Spin } from 'antd'
import { PlusOutlined, MinusOutlined, UpCircleTwoTone, ShoppingTwoTone, ShoppingOutlined, UpOutlined } from '@ant-design/icons';
import currency from 'currency-formatter';
import { cardProps, currencyFE } from '../../util/config'
import { rxGetDishes } from '../../apis'
import OrderSummary from './OrderSummary';
import rowTop from '../../assets/flecha-hacia-arriba.png'

const Home = () => {
  const [listDishes, setListDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [loadingGetDishes, setLoadingGetDishes] = useState(false);

  //TODO: GET ALL DISHES 
  const getDishes = () => {
    setLoadingGetDishes(true);
    rxGetDishes((querySnapshot) => {
        setLoadingGetDishes(false);
        const dishes = [];
        querySnapshot.forEach(doc => {
            dishes.push({...doc.data(), nIdDish: doc.id}) 
        })
        setListDishes(dishes);
        setLoadingGetDishes(false);
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
    <Spin spinning={loadingGetDishes}>
        <div className='flex justify-end'>
            <Affix offsetTop={20} className="mb-5">
                <Button 
                    type='primary' 
                    icon={<ShoppingOutlined />}
                    className='bg-primary' 
                    onClick={handleGenerateOrder}
                >
                    Generar Pedido
                </Button>
            </Affix>
        </div>
        <Row gutter={12}>
            {
                listDishes?.map((d, index)=> (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                        <div key={index} className="relative max-w-md mx-auto xl:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-2 pb-2 hover:shadow-gray-500 hover:px-[1px]">
                            <Badge count={quantityByDish(d)} color="blue" className='p-0'>
                                <div className="card">
                                    <div className="card-header mx-4 mt-6 bg-cover">
                                        <img
                                            className="rounded-lg cursor-pointer border bg-cover w-full"
                                            src={d.sPhoto}
                                            alt="Imagen del plato."
                                        />
                                    </div>
                                    <div className="card-body mx-4 mt-2">
                                        <div className='flex justify-between'>
                                        <h4 className="font-semibold text-xl">{d.sName}</h4>
                                        <h4 className="font-semibold text-2xl">S/. {d.nPrice ? currency.format(d.nPrice, currencyFE) : '0.00'}</h4>
                                        </div>
                                        <p className="opcacity-60 mb-4">
                                        The time is now for it to be okay to be great. People in this
                                        world shun people for being great. For being a bright color. For
                                        standing out.
                                        </p>
                                        <div className='flex justify-between'>
                                            <Button className='mr-1' block onClick={() => handleDelQtyDish(d)} disabled={disabledDelete(d)}>
                                                <MinusOutlined jey="del"/>
                                            </Button>
                                            <Button className='bg-primary ml-1' type='primary' block onClick={() => handleAddQtyDish(d)}>
                                                <PlusOutlined key="add" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Badge>
                        </div>
                    </Col>
                ))
            }
            <BackTop duration={500} className='hover:p-[1px]' >
                <Tooltip title="Subir">
                    <img src={rowTop} width="40px"/>
                </Tooltip>
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
    </Spin>
  )
}

export default Home;