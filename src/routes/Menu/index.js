import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, message, Badge, Affix, BackTop, Tooltip, Spin, Result } from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingOutlined } from '@ant-design/icons';
import currency from 'currency-formatter';
import { useAuth } from '../../Hooks/auth';
import { currencyFE } from '../../util/config';
import OrderSummary from './OrderSummary';
import rowTop from '../../assets/flecha-hacia-arriba.png';
import { rxGetDishes, rxShowOrderSummary, rxOrderSummary } from '../../appRedux/actions';

const Menu = () => {
  const { listDishes, loadingListDishes } = useSelector(state => state.get("dishes"));
  
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

  //TODO: INIT - GET ALL DISHES FOR CLIENTS
   useEffect(() => {
    dispatch(rxGetDishes(authSucursal));
   }, [authSucursal])

  return (
    <>
        {
            sRol === "mozo" || sRol === "administrador"?
            <Spin spinning={loadingListDishes} className="">
            <div className='flex justify-end mt-2'>
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
                        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={index}>
                            <div className="relative max-w-md mx-auto xl:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-2 pb-2 hover:shadow-gray-500 hover:px-[1px]">
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