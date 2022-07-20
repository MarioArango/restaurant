import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, message, Badge, Affix, BackTop, Tooltip, Spin, Result } from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingOutlined, FilterOutlined } from '@ant-design/icons';
import currency from 'currency-formatter';
import { useAuth } from '../../Hooks/auth';
import { currencyFE } from '../../util/config';
import OrderSummary from './OrderSummary';
import rowTop from '../../assets/flecha-hacia-arriba.png';
import { rxGetDishes, rxShowOrderSummary, rxOrderSummary, rxFilterDishes } from '../../appRedux/actions';

const Menu = () => {
  const [ typeDish, setTypeDish ] = useState("Todo")
  const { 
    listDishes, 
    loadingListDishes,
    listDishesComidas,
    listDishesBebidas
 } = useSelector(state => state.get("dishes"));
  
  const { showOrderSummary, orderSummary } = useSelector(state => state.get("orders"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  //TODO: SHOW ORDER SUMMARY
  const handleGenerateOrder = () => {
    if(orderSummary.length){
        dispatch(rxShowOrderSummary(true))
    }else {
        dispatch(rxShowOrderSummary(false))
        message.info("No tiene platos elegidos.")
    }
  }
  
  //TODO: ADD DISH TO ORDER
  const handleAddQtyDish = (dish) => {
    if(orderSummary.length === 0){
        dispatch(rxOrderSummary([{...dish, nQuantity: dish.nQuantity + 1}]))
    }else {
        const orderUp = orderSummary.filter(o => o.nIdDish === dish.nIdDish)
        if(orderUp.length === 1){
            const ordUp = {
                ...orderUp[0],
                nQuantity: orderUp[0]?.nQuantity + 1
            }
            const resultOrd = orderSummary.map(o => {
                if(o.nIdDish === ordUp.nIdDish){
                    return {
                        ...ordUp
                    }
                }
                return {
                    ...o
                }
            })
            dispatch(rxOrderSummary(resultOrd))
        }
        if(orderUp.length === 0){
            dispatch(rxOrderSummary([...orderSummary, {...dish, nQuantity: dish.nQuantity + 1}]))
        }
    }
  }
 
  //TODO: DELETE DISH TO ORDER
  const handleDelQtyDish = (dish) => {
    const orderUp = orderSummary.filter(o => o.nIdDish === dish.nIdDish);
    if(orderUp.length === 1 && orderUp[0].nQuantity > 0){
        const ordUp = {
            ...orderUp[0],
            nQuantity: orderUp[0]?.nQuantity - 1
        }
        const resultOrd = orderSummary.map(o => {
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
            dispatch(rxShowOrderSummary(false))
        }
        dispatch(rxOrderSummary(result))
    } 
  }

  //TODO: QUANTITY TOTAL BY DISH
  const quantityByDish = (dish) => {
    const orderMatch = orderSummary.filter(o => o.nIdDish === dish.nIdDish)
    return orderMatch[0]?.nQuantity?? 0
  }

  //TODO: DISABLED BUTTON DELETE DISH
  const disabledDelete = (dish) => {
    const orderMatch = orderSummary.filter(o => o.nIdDish === dish.nIdDish)
    return orderMatch.length === 0 ? true : orderMatch[0].nQuantity === 0? true : false
  }

  const handleTodo = () => {
    setTypeDish("Todo")
    dispatch(rxFilterDishes("todo"))
  }

  const handleComidas = () => {
    setTypeDish("Comidas")
    dispatch(rxFilterDishes("comida"))
  }

  const handleBebidas = () => {
    setTypeDish("Bebidas")
    dispatch(rxFilterDishes("bebida"))
  }

  const getCardDishes = () => {
    const list = listDishesComidas?.length > 0 ? listDishesComidas
                 : listDishesBebidas?.length > 0 ? listDishesBebidas
                  : listDishes;
                  
    return list?.map((d, index)=> (
        <Col xs={24} sm={12} md={6} lg={6} xl={6} key={index}>
            <div className="relative max-w-md mx-auto xl:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-2 pb-2 hover:shadow-gray-600 hover:px-[1px]">
                <Badge count={quantityByDish(d)} color="blue" className='p-0'>
                    <div className="card">
                        <div className="card-header bg-cover">
                            <img
                                className="rounded-xl p-1 cursor-pointer border bg-cover w-full"
                                src={d.sPhoto}
                                alt="Imagen del plato."
                            />
                        </div>
                        <div className="card-body mx-4 mt-1">
                            <div className='flex justify-between items-center mb-1'>
                                <h4 className="font-semibold text-sm">{d.sName}</h4>
                                <h4 className="font-semibold text-base">S/. {d.nPrice ? currency.format(d.nPrice, currencyFE) : '0.00'}</h4>
                            </div>
                            <p className="opcacity-60 mb-2 h-auto">
                                {d.sDescription}
                            </p>
                            <div className='flex justify-between'>
                                <Button shape='round' onClick={() => handleDelQtyDish(d)} icon={<MinusOutlined jey="del"/>} disabled={disabledDelete(d)}/>
                                <Button shape='round' className='bg-primary' type='primary' icon={<PlusOutlined key="add" />} onClick={() => handleAddQtyDish(d)}/>
                            </div>
                        </div>
                    </div>
                </Badge>
            </div>
        </Col>
    ))
  }

  //TODO: INIT - GET ALL DISHES FOR CLIENTS
   useEffect(() => {
    if(authSucursal){
        dispatch(rxGetDishes(authSucursal.nIdBranchOffice));
    }
    // eslint-disable-next-line
   }, [authSucursal?.nIdBranchOffice])

  return (
    <>
        {
            sRol === "mozo" || sRol === "administrador"?
            <Spin spinning={loadingListDishes} className="">
            <div className='flex justify-between mt-2'>
            <p className='font-semibold text-xl'>{typeDish}</p>
                <Affix offsetTop={20} className="mb-4">
                    <Button 
                        type='primary'
                        className='bg-primary' 
                        onClick={handleGenerateOrder}
                    >
                        <div className='flex justify-between'>
                        <ShoppingOutlined className='mt-1 mr-2'/> <p>Generar Pedido</p>
                        </div>
                    </Button>
                </Affix>
            </div>
            <div className='flex justify-around mb-2'>
                <Button type='dashed' onClick={handleTodo}>
                    <div className='flex justify-center'>
                        <FilterOutlined className='mt-1 mr-2'/>
                        Todo
                    </div>
                </Button>
                <Button type='dashed'  onClick={handleComidas}>
                    <div className='flex justify-center'>
                        <FilterOutlined className='mt-1 mr-2'/>
                        Comidas
                    </div>
                </Button>
                <Button type="dashed" onClick={handleBebidas}>
                    <div className='flex justify-center'>
                        <FilterOutlined className='mt-1 mr-2'/>
                        Bebidas
                    </div>
                </Button>
            </div>
            <Row gutter={12}>
                {
                    getCardDishes()
                }
                <BackTop duration={500} className='hover:p-[1px]' >
                    <Tooltip title="Subir">
                        <img src={rowTop} width="40px" alt="subir"/>
                    </Tooltip>
                </BackTop>
            </Row>
            {
                showOrderSummary && orderSummary?.length &&
                <OrderSummary 
                    quantityByDish={quantityByDish}
                    handleAddQtyDish={handleAddQtyDish}
                    handleDelQtyDish={handleDelQtyDish}
                />
            }
            </Spin>
            : <Result
                status="403"
                title="403"
                subTitle="Lo sentimos, no está autorizado para acceder a esta página."
            />
        }
    </>
  )
}

export default Menu;