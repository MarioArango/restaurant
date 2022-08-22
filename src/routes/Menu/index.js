import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, message, Badge, Affix, BackTop, Tooltip, Spin, Segmented } from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import currency from 'currency-formatter';
import { currencyFE, dateFormatList } from '../../util/config';
import OrderSummary from './OrderSummary';
import TypeService from './TypeService';
import FormRate from './FormRate';
import rowTop from '../../assets/flecha-hacia-arriba.png';
import { 
    rxGetTypesProducts, 
    rxShowOrderSummary, 
    rxOrderSummary, 
    rxFilterDishesMenu, 
    rxGetDishesMenu, 
    rxAddRequestWaiter, 
    rxShowTypeService,
    rxShowRate,
    rxUpdateOrder,
    rxClearAllOrderSummary,
    rxClearAllInitService,
    rxShowInitService
} from '../../appRedux/actions';
import InitService from './InitService';
import Permissions from '../../components/Permissions';
import { usePermission } from '../../Hooks/usePermission';
import PButton from '../../components/PButton';

const Menu = () => {
    
  const [ listFilterMenu, setListFilterMenu ] = useState([]);

  const { showOrderSummary, orderSummary, orderSummaryTotal, loadingUpdateStateOrders } = useSelector(state => state.get("orders"));

  const { loadingListDishesMenu, listDishesMenu, listDishesMenuFilter, showInitService, initService } = useSelector(state => state.get("menu"));

  const { 
    authSucursal, 
    typeService, 
    numberTable, 
    loadingRequestWaiter, 
    showTypesService
} = useSelector(state => state.get("users"));

const { 
    loadingListTypesProducts,
    listTypesProducts,
    loadingDeleteTypeProduct,
    loadingCreateTypeProduct,
    loadingUpdateTypeProduct
  } = useSelector(state => state.get("typesProducts"));

  const dispatch = useDispatch();

  const permRequestPayment = usePermission("menu.request-payment");
  const permRequestWaiter = usePermission("menu.request-waiter");

  //TODO: SHOW ORDER SUMMARY
  const handleGenerateOrder = () => {
    if(orderSummary?.length >0 || orderSummaryTotal?.length > 0){
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

  const handleFilterByTypeProduct = (typeFilter) => {
    dispatch(rxFilterDishesMenu(typeFilter))
  }

  const getCardDishes = () => {
    const list = listDishesMenuFilter?.length > 0 ? listDishesMenuFilter
                  : listDishesMenu;
                  
    return list?.map((d, index)=> (
        <Col xs={24} sm={8} md={6} lg={6} xl={4} key={index}>
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

  //TODO: REQUEST WAITER
  const handleRequestWaiter = () => {
    if(typeService && numberTable && authSucursal){
        const requestWaiter = {
            nIdBranchOffice: authSucursal.nIdBranchOffice,
            sNumberTable: numberTable,
            dCreated: moment().format("DD/MM/YYYY"),
            dCreatedHour: Number(moment().format("HH")),
            dCreatedMin: Number(moment().format("mm")),
        }
        dispatch(rxAddRequestWaiter(requestWaiter))
    }else {
        message.info("Debe agregar el número de mesa.")
        dispatch(rxShowTypeService(true))
    }
  }

  //TODO: REQUEST PAYMENT
  const handleRequestPayment = () => {
    if(typeService && numberTable && authSucursal){
        orderSummaryTotal.forEach(os => {
            const updOrder = {
                dRequestPayment: moment().format(dateFormatList[2]),
                sState: "requestPayment"
            }
            dispatch(rxUpdateOrder(os.nIdOrder, updOrder));
        })
        //CLEAR
        dispatch(rxClearAllOrderSummary());
        dispatch(rxClearAllInitService());
        dispatch(rxShowRate(true));
    }else {
        message.info("Debe agregar el número de mesa.")
        dispatch(rxShowTypeService(true))
    }
  }

  //TODO: INIT - GET ALL DISHES FOR CLIENTS
   useEffect(() => {
    if(authSucursal && typeService){
        dispatch(rxGetDishesMenu(authSucursal.nIdBranchOffice, typeService));
        dispatch(rxGetTypesProducts(authSucursal.nIdBranchOffice));
    }
    if (!typeService){
        dispatch(rxShowTypeService(true));
    }
    if(initService?.length===0){
        dispatch(rxShowInitService(true))
    }
    // eslint-disable-next-line
   }, [authSucursal?.nIdBranchOffice, typeService, loadingDeleteTypeProduct, loadingCreateTypeProduct, loadingUpdateTypeProduct])

   //TODO: INIT
   useEffect(() => {
        if(authSucursal){
            let lisFilter = listTypesProducts?.map((tp, index) => ({
                label: tp.sTypeProduct,
                value: tp.nIdTypeProduct,
                key: index
            }))
            listTypesProducts?.length && lisFilter.push({label: "Menú Completo", value: "", index: "index"});
            setListFilterMenu(lisFilter);
        }
    // eslint-disable-next-line
   }, [authSucursal?.nIdBranchOffice, listTypesProducts])

   return (
    <Permissions permission="menu">
        <>
            <Spin spinning={loadingListDishesMenu || loadingListTypesProducts}>
            <div className='flex justify-between overflow-x-auto'>
                <div className='mr-2'>
                    {
                        typeService === "mesa" && orderSummaryTotal?.length > 0 &&
                            <PButton
                                permission={permRequestPayment}
                                handleClick={handleRequestPayment}
                                loading={loadingUpdateStateOrders}
                                icon={<FileDoneOutlined className='mt-1 mr-2' />}
                                text="Pedir Cuenta"
                            />
                    }
                </div>
                <div className='mr-2'>
                    {
                        (typeService === "mesa") &&
                        <PButton
                            permission={permRequestWaiter}
                            handleClick={handleRequestWaiter}
                            loading={loadingRequestWaiter}
                            icon={<UserOutlined className='mt-1 mr-2' />}
                            text="Solicitar Mozo"
                        />
                            
                    }
                </div>
                <div>
                    <Affix offsetTop={20} className="mb-4">
                        <Button 
                            type='primary'
                            className='bg-primary' 
                            onClick={handleGenerateOrder}
                            disabled={!typeService}
                        >
                            <div className='flex justify-between'>
                                <ShoppingOutlined className='mt-1 mr-2'/> 
                                <p>
                                    {
                                        (orderSummary?.length === 0 && orderSummaryTotal?.length > 0)
                                        ? "Ver resumen de pedido"
                                        : orderSummary?.length > 0 
                                            ?"Generar Pedido" 
                                            : "Generar Pedido"
                                    }
                                </p>
                            </div>
                        </Button>
                    </Affix>
                </div>
            </div>
            <div className='flex justify-center mb-2'>
                <div className='overflow-x-auto'>
                    <Segmented
                        options={listFilterMenu} 
                        onChange={(value) => handleFilterByTypeProduct({nIdTypeProduct: value, reset: !Boolean(value)})}
                    />
                </div>
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
                showOrderSummary &&
                <OrderSummary 
                    quantityByDish={quantityByDish}
                    handleAddQtyDish={handleAddQtyDish}
                    handleDelQtyDish={handleDelQtyDish}
                />
            }
            </Spin>
            <>
                { showTypesService && <TypeService/> }
            </>
            <>
                <FormRate/>
            </>
            <>
                { showInitService && <InitService/> }
            </>
        </>
    </Permissions>
  )
}

export default Menu;