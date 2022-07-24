import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import currency from 'currency-formatter'
import { CheckOutlined, FileDoneOutlined, ScheduleOutlined} from '@ant-design/icons';
import { Table, Card, Tag, Button, Result, Steps, Collapse } from 'antd';
import { cardProps, currencyFE, customScroll, dateFormatList, tableProps } from '../../util/config';
import { useAuth } from '../../Hooks/auth';
import { 
    rxGetOrders, 
    rxUpdateOrder, 
    rxOrderSelected,
    rxOrderDishSelected
} from '../../appRedux/actions';

const { Panel } = Collapse;
const { Step } = Steps;

const Orders = () => {
  const { 
      loadingGetOrders,
      listOrders,
      orderSelected,
      orderDishSelected,
      loadingUpdateStateOrders
  } = useSelector(state => state.get("orders"))

  const { authSucursal, typeService } = useSelector(state => state.get("users"));

  const dispatch = useDispatch()

  const { sRol } = useAuth()
  let { pathname } = useLocation();

  const handleChangeStateOrder = (order) => {
    if(order.sState === "pending"){
        const updOrder = {
            dDelivered: moment().format(dateFormatList[2]),
            sState: "delivered"
        }
        dispatch(rxUpdateOrder(order.nIdOrder, updOrder))
    }
  }

  const handleFinishedOrder = () => {

  }

  //TODO: COLUMNS TABLE
  const columns = [
    {
        key: "index",
        title: "#",
        width: 20,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sTypeService",
        dataIndex: "sTypeService",
        title: "Tipo de servicio",
        width: 20,
        align: "center"
    },
    {
        key: "nNumberTable",
        dataIndex: "nNumberTable",
        title: "Número de mesa",
        width: 20,
        align: "center"
    },
    {
        key: "index",
        title: "#",
        width: 20,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sState",
        dataIndex: "sState",
        title: "Estado",
        width: 60,
        align: "center",
        render: value => value === "pending"? <Tag color="gold">Pendiente</Tag> 
                            :value === "delivered"? <Tag color="blue">Entregado</Tag> 
                            :value === "requestPayment"? <Tag color="red">Cuenta solicitada</Tag> 
                            :value === "finished"? <Tag color="success">Finalizado</Tag> : ""
    },
    {
        key: "dCreated",
        dataIndex: "dCreated",
        title: "Creado",
        width: 80,
        align: "center",
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 50,
        align: "center",
        render: (_, order) => (
            <>
                {
                    (sRol === "administrador" || sRol === "mozo") &&
                    <Button 
                        disabled={order.sState === "finished"}
                        type='primary'
                        className='bg-primary'
                        onClick={() => handleChangeStateOrder(order)}
                    >
                        <div className='flex justify-center'>
                            <CheckOutlined className='mt-1 mr-2'/> 
                            <p>Atender</p>
                        </div>
                    </Button>
                }
            </>
                
        )
    }
  ]

  const columnsDishes = [
    {
        key: "index",
        title: "#",
        width: 5,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sName",
        dataIndex: "sName",
        title: "Plato",
        width: 46,
        align: "center",
    },
    // {
    //     key: "sType",
    //     dataIndex: "sType",
    //     title: "Tipo",
    //     width: 60,
    //     align: "center",
    // },
    {
        key: "nQuantityTotal",
        dataIndex: "nQuantityTotal",
        title: "Cantidad",
        width: 14,
        align: "right",
    },
    // {
    //     key: "priceTotal",
    //     dataIndex: "priceTotal",
    //     title: "Precio Total",
    //     width: 60,
    //     align: "right",
    //     render: value => value ? currency.format(value, currencyFE) : '0.00'
    // }
  ]

  //TODO: INIT - GET ALL DISHES FOR CLIENTS
  useEffect(() => {
        if(pathname === "/orders"){
            if(authSucursal && typeService){
                let unsub;
                dispatch(rxGetOrders(authSucursal.nIdBranchOffice, typeService, (us) => {
                    unsub = us
                }))  
                return () => {
                    console.log('unsub')
                    unsub()
                }
            } 
        }
    // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice, typeService])

  return (
    <div className='h-screen'>
        {
            sRol === "chef" || sRol === "administrador" || sRol === "mozo"?
            <>
                <Collapse defaultActiveKey={['1']} className="my-3">
                    <Panel key="1" header="Proceso del pedido">
                        <Steps size='small' current={3}>
                            <Step title={<strong>PENDIENTE</strong>} description="El cliente solicitó un pedido" icon={<Tag color="gold">1</Tag>}/>
                            <Step title={<strong>ENTREGADO</strong>} description="Se entrego el pedido al cliente" icon={<Tag color="blue">2</Tag>}/>
                            <Step title={<strong>CUENTA SOLICITADA</strong>} description="El cliente pidio la cuenta a pagar" icon={<Tag color="red">3</Tag>}/>
                            <Step title={<strong>FINALIZADO</strong>} description="El cliente pago" icon={<Tag color="success">4</Tag>}/>
                        </Steps>
                    </Panel>
                </Collapse>
                <Card
                    {...cardProps}
                    title={
                        <div className='flex justify-start'>
                            <ScheduleOutlined className='mt-1 mr-2'/> 
                            <p>Lista de Pedidos</p>
                        </div>
                    }
                    //Finalizar selcciona todas las mesas iguales y que todas esten con el estado pedir cuenta
                    //click y todas las ordenes de esa mesa las actualiza a finalizado
                    extra={
                        <Button type='primary' className='bg-primary' onClick={handleFinishedOrder}>
                            <div className='flex justify-center'>
                                <FileDoneOutlined className='mt-1 mr-2' />
                                <p>Finalizar</p>
                            </div>
                        </Button>
                    }
                >
                {
                    listOrders && listOrders.length && 
                    <Table
                        {...tableProps}
                        bordered
                        columns={columns}
                        loading={loadingGetOrders || loadingUpdateStateOrders}
                        dataSource={listOrders}
                        rowKey={(order) => order.nIdOrder}
                        rowClassName={(order) => order?.nIdOrder === orderSelected?.nIdOrder ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                        scroll={{x: "80vw", y: "65vh"}}
                        onRow={(order) => ({
                            onClick: () => {
                                dispatch(rxOrderSelected(order))
                            }
                        })}
                        expandable={{
                            columnWidth: 10,
                            defaultExpandAllRows: true,
                            expandRowByClick: true,
                            expandedRowRender: (order) => (
                                <Table
                                    {...tableProps}
                                    bordered
                                    columns={columnsDishes}
                                    dataSource={order.dishes}
                                    rowKey={(dish) => dish.nIdDish}
                                    rowClassName={(dish) => dish?.nIdDish === orderDishSelected?.nIdDish ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                                    // scroll={customScroll()}
                                    onRow={(dish) => ({
                                        onClick: () => {
                                            dispatch(rxOrderDishSelected(dish))
                                        }
                                    })}
                                    footer={null}
                                />
                            )
                        }}
                    />
                }
                </Card>
            </>
            : <Result
                status="403"
                title="403"
                subTitle="Lo sentimos, no está autorizado para acceder a esta página."
            />
        }
    </div>
  )
}

export default Orders;