import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Result, message } from 'antd';
import { cardProps, dateFormatList, tableProps } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import { rxReportOrders } from '../../../appRedux/actions';
import moment from 'moment';
import RangeDateFilter from '../../../components/RangeDateFilter';
import Excel from '../../../components/Excel';

const Orders = () => {

  const [rangeDate, setRangeDate] = useState([moment(), moment()]);
  
  const { loadingListReportOrders, listReportOrders } = useSelector(state => state.get("reports"));
  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const handleFilter = () => {
    if(authSucursal){
      const from = moment(rangeDate[0]).format(dateFormatList[0]) + " 00:00:00";
      const to = moment(rangeDate[1]).format(dateFormatList[0]) + " 24:00:00";
      dispatch(rxReportOrders(authSucursal.nIdBranchOffice, from, to))
    }else {
      message.info('Seleccione una sucursal')
    }
  }

  const columns = [
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
        title: "PLATO",
        width: 60,
        align: "left"
    },
    {
        key: "nNumberTable",
        dataIndex: "nNumberTable",
        title: "NÚMERO DE MESA",
        width: 40,
        align: "right",
    },
    {
        key: "dCreated",
        dataIndex: "dCreated",
        title: "HORA DE SOLICITUD",
        width: 60,
        align: "center"
    },
    {
        key: "dDelivered",
        dataIndex: "dDelivered",
        title: "HORA DE ENTREGA",
        width: 60,
        align: "center"
    },

  ]
  //FALTA IMPLEMENTAR FILTRO
  useEffect(() => {
    if(authSucursal){
      handleFilter();
    }
    // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice])

  return (
    <div className='h-screen'>
      {
        sRol === "administrador" ?
        <div>
          <RangeDateFilter handleFilter={handleFilter} rangeDate={rangeDate} setRangeDate={setRangeDate}/>
          <Card
              {...cardProps}
              title="Reporte de pedidos"
              extra={
                <Excel dataSource={listReportOrders} columns={columns} fileName="Reporte_pedidos"/>
              }
          >
              <Table
                  {...tableProps}
                  bordered
                  columns={columns}
                  loading={loadingListReportOrders}
                  dataSource={listReportOrders}
                  rowKey={(dish) => dish.nIdDish}
                  rowClassName={(_) => "cursor-pointer"}
                  scroll={{y: "55vh"}}
              />
          </Card>
        </div>
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