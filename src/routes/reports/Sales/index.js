import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import currency from 'currency-formatter';
import { Table, Card, Result, message } from 'antd';
import { cardProps, currencyFE, dateFormatList, tableProps } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import { rxReportSales } from '../../../appRedux/actions';
import moment from 'moment';
import RangeDateFilter from '../../../components/RangeDateFilter';
// import Excel from '../../../components/Excel';

const Sales = () => {

  const [rangeDate, setRangeDate] = useState([moment(), moment()]);
  
  const { loadingListSales, listSales } = useSelector(state => state.get("sales"));
  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const handleFilter = () => {
    if(authSucursal){
      const from = moment(rangeDate[0]).format(dateFormatList[0]) + " 00:00:00";
      const to = moment(rangeDate[1]).format(dateFormatList[0]) + " 24:00:00";
      dispatch(rxReportSales(authSucursal.nIdBranchOffice, from, to))
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
        key: "nNumberDiners",
        dataIndex: "nNumberDiners",
        title: "NÚMERO DE COMENSALES",
        width: 50,
        align: "right"
    },
    {
        key: "nPriceTotal",
        dataIndex: "nPriceTotal",
        title: "PRECIO TOTAL",
        width: 50,
        align: "right",
        render: value => value ? currency.format(value, currencyFE) : '0.00'
    },
    {
        key: "dInitService",
        dataIndex: "dInitService",
        title: "HORA DE APERTURA",
        width: 60,
        align: "center"
    },
    {
        key: "dRequestPayment",
        dataIndex: "dRequestPayment",
        title: "HORA DE CIERRE",
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
              title="Reporte de ventas"
              // extra={
              //   <Excel dataSource={listSales} columns={columns} fileName="Reporte_ventas"/>
              // }
          >
              <Table
                  {...tableProps}
                  bordered
                  columns={columns}
                  loading={loadingListSales}
                  dataSource={listSales}
                  rowKey={(sale) => sale.nIdSale}
                  rowClassName={(_) => "cursor-pointer"}
                  scroll={{y: "55vh"}}
                  summary={(sales) => {
                    let priceTotal = 0;
                    sales?.forEach(s => {
                      priceTotal += s.nPriceTotal
                    })
                    return (
                        <Table.Summary.Row>
                          <Table.Summary.Cell/>
                          <Table.Summary.Cell/>
                          <Table.Summary.Cell>
                            <div className='flex justify-between text-base font-bold'>
                              <p>Total:</p>
                              <p className='text-green-500'>S/. {priceTotal ? currency.format(priceTotal, currencyFE) : '0.00'}</p>
                            </div>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )
                  }
                  }
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

export default Sales;