import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Result, message } from 'antd';
import { cardProps, dateFormatList, tableProps } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import { rxReportRates } from '../../../appRedux/actions';
import moment from 'moment';
import RangeDateFilter from '../../../components/RangeDateFilter';
import Excel from '../../../components/Excel';
import Permissions from '../../../components/Permissions';

const Rates = () => {

  const [rangeDate, setRangeDate] = useState([moment(), moment()]);
  
  const { loadingListReportRates, listReportRates } = useSelector(state => state.get("reports"));
  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const handleFilter = () => {
    if(authSucursal){
      const from = moment(rangeDate[0]).format(dateFormatList[0]) + " 00:00:00";
      const to = moment(rangeDate[1]).format(dateFormatList[0]) + " 24:00:00";
      dispatch(rxReportRates(authSucursal.nIdBranchOffice, from, to))
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
        key: "nNumberTable",
        dataIndex: "nNumberTable",
        title: "NÚMERO DE MESA",
        width: 30,
        align: "right",
    },
    {
      key: "nRate",
      dataIndex: "nRate",
      title: "PUNTUACIÓN",
      width: 30,
      align: "right"
  },
    {
        key: "sCommentRate",
        dataIndex: "sCommentRate",
        title: "COMENTARIO",
        width: 60,
        align: "left"
    },
    {
        key: "dCreated",
        dataIndex: "dCreated",
        title: "CREADO",
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
    <Permissions permission="reports.rates">
      <>
        <RangeDateFilter handleFilter={handleFilter} rangeDate={rangeDate} setRangeDate={setRangeDate}/>
        <Card
            {...cardProps}
            title="Reporte de ventas"
            extra={
              <Excel dataSource={listReportRates} columns={columns} fileName="Reporte_puntuaciones"/>
            }
        >
            <Table
                {...tableProps}
                bordered
                columns={columns}
                loading={loadingListReportRates}
                dataSource={listReportRates}
                rowKey={(rate) => rate.nIdRate}
                rowClassName={(_) => "cursor-pointer"}
                scroll={{y: "55vh"}}
            />
        </Card>
      </>
    </Permissions>
  )
}

export default Rates;