import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { CheckOutlined, FileDoneOutlined, ScheduleOutlined} from '@ant-design/icons';
import { Table, Card, Tag, Button, Steps, Collapse } from 'antd';
import { cardProps, dateFormatList, tableProps } from '../../util/config';
import Permissions from '../../components/Permissions';
import { usePermission } from '../../Hooks/usePermission';
import { 
    rxGetOrders, 
    rxUpdateOrder, 
    rxOrderSelected,
    rxOrderDishSelected,
    rxAddOrderSummaryTotalByClient
} from '../../appRedux/actions';
import PButton from '../../components/PButton';
import withFilterTable from '../../HOC/withFilterTable';


const { Panel } = Collapse;
const { Step } = Steps;

const Orders = (props) => {

  const {
    getFilterItemsProps
  } = props;

  const { loadingGetOrders, listOrders, orderSelected, orderDishSelected, loadingUpdateStateOrders } = useSelector(state => state.get("orders"))
  const { authSucursal, numberTable } = useSelector(state => state.get("users"));

  const dispatch = useDispatch()

  const permAttendOrder = usePermission("orders.attend-order");
  let { pathname } = useLocation();

  const handleDDelivered = (order) => {
    if(order.sState === "pending"){
        const updOrder = {
            dDelivered: moment().format(dateFormatList[2]),
            sState: "delivered"
        }
        dispatch(rxUpdateOrder(order.nIdOrder, updOrder))
    }
  }

  //TODO: FINISHED ORDER
  const handleFinishedOrder = (orderS) => {
    if(numberTable && authSucursal){
        const orderToUpd = []
        listOrders.forEach(o => {
            if( o.nNumberTable === orderS.nNumberTable && o.sState === "requestPayment"){
                orderToUpd.push(o)
            }
        })
        orderToUpd.forEach(os => {
            const updOrder = {
                sState: "finished"
            }
            dispatch(rxUpdateOrder(os.nIdOrder, updOrder));
        })
        //SEND COLLECTION reportSale
        const orderTotal = {
            dInitService:  orderToUpd[0]?.dInitService,
            nNumberDiners:  orderToUpd[0]?.nNumberDiners,
            dRequestPayment: orderToUpd[0]?.dRequestPayment,
            nIdBranchOffice: orderToUpd[0]?.nIdBranchOffice,
            nNumberTable: orderToUpd[0]?.nNumberTable?? "",
            orderSummaryTotal: orderToUpd
        }
        dispatch(rxAddOrderSummaryTotalByClient(orderTotal));
    }
  }

  //TODO: COLUMNS TABLE
  const columns = [
    {
        key: "nNumberTable",
        dataIndex: "nNumberTable",
        title: "Número mesa",
        width: 20,
        align: "center",
        render: value => <p className='font-bold text-base'>{value}</p>,
        ...getFilterItemsProps({
            dataIndex: "nNumberTable",
            dataSource: listOrders
          }),
    },
    {
        key: "sState",
        dataIndex: "sState",
        title: "Estado",
        width: 40,
        align: "center",
        render: value => value === "pending"? <Tag color="gold">Pendiente</Tag> 
                            :value === "delivered"? <Tag color="blue">Entregado</Tag> 
                            :value === "requestPayment"? <Tag color="red">Cuenta solicitada</Tag> 
                            :value === "finished"? <Tag color="success">Finalizado</Tag> : "",
        ...getFilterItemsProps({
          dataIndex: "sState",
          dataSource: listOrders,
          labels: {
            pending: "Pendiente",
            delivered: "Entregado",
            requestPayment: "Cuenta solicitada",
            finished: "Finalizado"
          }
        }),
    },
    {
        key: "dCreated",
        dataIndex: "dCreated",
        title: "Creado",
        width: 60,
        align: "center",
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 60,
        align: "center",
        render: (_, order) => (
            <PButton
                permission={permAttendOrder}
                handleClick={() => handleDDelivered(order)}
                icon={<CheckOutlined className='mt-1 mr-2' />}
                text="Atendendido"
                disabled={order.sState !== "pending"}
            />  
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
    {
        key: "nQuantityTotal",
        dataIndex: "nQuantityTotal",
        title: "Cantidad",
        width: 14,
        align: "right",
    }
  ]

  //TODO: INIT - GET ALL DISHES FOR CLIENTS
  useEffect(() => {
        if(pathname === "/orders"){
            if(authSucursal){
                let unsub;
                dispatch(rxGetOrders(authSucursal.nIdBranchOffice, (us) => {
                    unsub = us
                }))  
                return () => {
                    // console.log('unsub')
                    unsub()
                }
            } 
        }
    // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice])

  return (
    <Permissions permission="orders">
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
                    extra={
                        <>
                            {
                                orderSelected?.sState === "requestPayment" &&
                                <Button type='primary' onClick={() => handleFinishedOrder(orderSelected)}>
                                    <div className='flex justify-center'>
                                        <FileDoneOutlined className='mt-1 mr-2' />
                                        <p>Finalizar Mesa {orderSelected?.nNumberTable}</p>
                                    </div>
                                </Button>
                            }
                        </>
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
                        rowKey={(order) => order?.nIdOrder}
                        rowClassName={(order) => order?.nIdOrder === orderSelected?.nIdOrder ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                        scroll={{x: 900 }}
                        onRow={(order) => ({
                            onClick: () => {
                                dispatch(rxOrderSelected(order))
                            }
                        })}
                        expandable={{
                            columnWidth: 10,
                            expandRowByClick: true,
                            expandedRowRender: (order) => (
                                <Table
                                    {...tableProps}
                                    bordered
                                    columns={columnsDishes}
                                    dataSource={order?.dishes}
                                    rowKey={(dish) => dish?.nIdDish}
                                    rowClassName={(dish) => dish?.nIdDish === orderDishSelected?.nIdDish ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                                    onRow={(dish) => ({
                                        onClick: () => {
                                            dispatch(rxOrderDishSelected(dish))
                                        }
                                    })}
                                    scroll={{x: 600}}
                                    footer={null}
                                />
                            )
                        }}
                        footer={null}
                    />
                }
                </Card>
        </>
    </Permissions>
  )
}

export default withFilterTable(Orders);