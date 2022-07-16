import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import currency from 'currency-formatter'
import { ScheduleOutlined} from '@ant-design/icons';
import { Table, Card, Tag, Tooltip, Spin, Button } from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../util/config';
import { 
    rxGetOrders, 
    rxUpdateOrder, 
    rxOrderSelected,
    rxOrderDishSelected
} from '../../appRedux/actions';

const Orders = () => {
  const { 
      loadingGetOrders,
      listOrders,
      orderSelected,
      orderDishSelected,
      loadingUpdateStateOrders
  } = useSelector(state => state.get("orders"))

  const dispatch = useDispatch()

  let { pathname } = useLocation();

  const handleChangeStateOrder = (order) => {
    if(order.sState === "pending"){
        const updOrder = {
            sState: "process"
        }
        dispatch(rxUpdateOrder(order.nIdOrder, updOrder))
    }
    if(order.sState === "process"){
        const updOrder = {
            sState: "finished"
        }
        dispatch(rxUpdateOrder(order.nIdOrder, updOrder))
    }
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
        key: "sState",
        dataIndex: "sState",
        title: "Estado",
        width: 60,
        align: "center",
        render: value => value === "pending"? <Tag color="gold">Pendiente</Tag> 
                            :value === "process"? <Tag color="blue">En preparación</Tag> 
                            :value === "finished"? <Tag color="success">Entregado</Tag> : ""
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
            <Spin spinning={loadingUpdateStateOrders}>
                <Button 
                    disabled={order.sState === "finished"}
                    type='primary'
                    className='bg-primary'
                    block
                    onClick={() => handleChangeStateOrder(order)}
                >
                    Atender
                </Button>
            </Spin>
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
          let unsub;
          dispatch(rxGetOrders((us) => {
              unsub = us
          }))  
          return () => {
              console.log('unsub')
              unsub()
          }
      }
  }, [])

  return (
        <Card
            {...cardProps}
            title={<div><ScheduleOutlined/> Lista de Platos</div>}
        >
            {
                listOrders && listOrders.length && 
                <Table
                    {...tableProps}
                    bordered
                    columns={columns}
                    loading={loadingGetOrders}
                    dataSource={listOrders}
                    rowKey={(order) => order.nIdOrder}
                    rowClassName={(order) => order?.nIdOrder === orderSelected?.nIdOrder ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                    scroll={{x: "80vw", y: "100vh"}}
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
  )
}

export default Orders;