import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currency from 'currency-formatter'
import { ScheduleOutlined} from '@ant-design/icons';
import { Table, Card, Tag, Tooltip, Spin, Button } from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../util/config';
import { 
    rxGetOrders, 
    rxUpdateOrder, 
    rxOrderSelected,
    rxDishSelected
} from '../../appRedux/actions';

const Orders = () => {
    const { 
        loadingGetOrders,
        listOrders,
        orderSelected,
        dishSelected,
        loadingUpdateStateOrders
    } = useSelector(({ orders}) => orders)

    const dispatch = useDispatch()

  const handleChangeStateOrder = (order) => {
    dispatch(rxUpdateOrder(order.nIdOrder, order))
  }

  //TODO: COLUMNS TABLE
  const columns = [
    {
        key: "index",
        title: "#",
        width: 40,
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
            <Tooltip title="">
                <Spin spinning={loadingUpdateStateOrders}>
                    <Button 
                        type='primary'
                        className='bg-primary'
                        block
                        onClick={() => handleChangeStateOrder(order)}
                    >
                        Atender
                    </Button>
                    
                </Spin>
            </Tooltip>
        )
    }
  ]

  const columnsDishes = [
    {
        key: "index",
        title: "#",
        width: 20,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sName",
        dataIndex: "sName",
        title: "Plato",
        width: 30,
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
        width: 30,
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
        console.log('entro')
        dispatch(rxGetOrders())
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
                        expandedRowRender: (order) => (
                            <Table
                                {...tableProps}
                                bordered
                                columns={columnsDishes}
                                dataSource={order.dishes}
                                rowKey={(dish) => dish.nIdDish}
                                rowClassName={(dish) => dish?.nIdDish === dishSelected?.nIdDish ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                                // scroll={customScroll()}
                                onRow={(dish) => ({
                                    onClick: () => {
                                        dispatch(rxDishSelected(dish))
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