import { useState } from 'react';
import { ScheduleOutlined} from '@ant-design/icons';
import { Table, Card } from 'antd';
import { cardProps, customScroll, tableProps } from '../../util/config';

const Orders = () => {
  //TODO: STATE OWN COMPONENT
  const [ orderSelected, setOrderSelected ] = useState(null);

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
        key: "sDescripcion",
        dataIndex: "sDescripcion",
        title: "Descripción",
        width: 150,
        align: "center",
        render: (value) => value ? value : "-"
    },
  ]

  return (
        <Card
            {...cardProps}
            title={<div><ScheduleOutlined/> Lista de Platos</div>}
        >
            <Table
                {...tableProps}
                bordered
                columns={columns}
                loading={false}
                dataSource={[]}
                rowKey={(order) => order.nIdOrder}
                rowClassName={(order) => order?.nIdOrder === orderSelected?.nIdOrder ? "gx-outline-record gx-pointer" : "gx-pointer"}
                scroll={customScroll()}
                onRow={(order) => ({
                    onClick: () => {
                        setOrderSelected(order)
                    }
                })}
            />
        </Card>
  )
}

export default Orders;