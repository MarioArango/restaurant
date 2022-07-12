import { useState, useEffect} from 'react';
import currency from 'currency-formatter'
import { CheckSquareTwoTone, ScheduleOutlined} from '@ant-design/icons';
import { Table, Card, Tag, Tooltip, Spin, Button } from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../util/config';
import { rxGetOrders, rxUpdateOrder } from '../../apis';

const Orders = () => {
  //TODO: STATE OWN COMPONENT
  const [ orderSelected, setOrderSelected ] = useState(null);
  const [ dishSelected, setDishSelected ] = useState(null);
  const [loadingGetOrders, setLoadingGetOrders]= useState(false);
  const [loadingUpdateStateOrders, setLoadingUpdateStateOrders]= useState(false);
  const [listOrders, setListOrders]= useState(false);

  //TODO: GET ALL ORDERS 
  const getOrders = () => {
      setLoadingGetOrders(true);
      rxGetOrders((querySnapshot) => {
          setLoadingGetOrders(false);
          const orders = [];
          querySnapshot.forEach(doc => {
              orders.push({...doc.data(), nIdOrder: doc.id}) 
          })
          setListOrders(orders);
          setLoadingGetOrders(false);
      })
    }
  const handleChangeStateOrder = (order) => {
    setLoadingUpdateStateOrders(true);
    rxUpdateOrder(order.nIdOrder, order, () => {
        setOrderSelected(null)
        setDishSelected(null)
        setLoadingUpdateStateOrders(false)
    })
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
                        Recibido
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
        width: 40,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sName",
        dataIndex: "sName",
        title: "Plato",
        width: 80,
        align: "center",
    },
    {
        key: "sType",
        dataIndex: "sType",
        title: "Tipo",
        width: 60,
        align: "center",
    },
    {
        key: "nQuantityTotal",
        dataIndex: "nQuantityTotal",
        title: "Cantidad",
        width: 60,
        align: "right",
    },
    {
        key: "priceTotal",
        dataIndex: "priceTotal",
        title: "Precio Total",
        width: 60,
        align: "right",
        render: value => value ? currency.format(value, currencyFE) : '0.00'
    }
  ]

    //TODO: INIT - GET ALL DISHES FOR CLIENTS
    useEffect(() => {
        getOrders();
    }, [])

    console.log(listOrders, "listOrders")

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
                    scroll={customScroll()}
                    onRow={(order) => ({
                        onClick: () => {
                            setOrderSelected(order)
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
                                scroll={customScroll()}
                                onRow={(dish) => ({
                                    onClick: () => {
                                        setDishSelected(dish)
                                    }
                                })}
                            />
                        )
                    }}
                />
            }
        </Card>
  )
}

export default Orders;