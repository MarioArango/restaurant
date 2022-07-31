import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import currency from 'currency-formatter';
import { Table, Card, Collapse, DatePicker, Result, Row, Col, message, Button} from 'antd';
import { cardProps, currencyFE, dateFormatList, tableProps } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import { rxReportSales } from '../../../appRedux/actions';
import { FilterOutlined } from '@ant-design/icons';
import moment from 'moment';
// import Excel from '../../../components/Excel';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

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

  const handleSelectDate = (type) => {
    if(authSucursal){
      switch(type){
        case "currentYear":
          setRangeDate([moment().startOf('year'), moment().endOf('year')]) //ASIGNAR UNA MESA POR PERSONA EN LA BARRA
          break;
        case "lastMonth":
          setRangeDate([moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')])
          break;
        case "currentMonth":
          setRangeDate([moment().startOf('months'), moment().endOf('months')])
          break;
        case "lastWeek":
          setRangeDate([moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')])
          break;
        case "currentWeek":
          setRangeDate([moment().startOf('week'), moment().endOf('week')])
          break;
        case "yesterday":
          setRangeDate([moment().subtract(1, 'day'), moment().subtract(1, 'day')])
          break;
        case "today":
          setRangeDate([moment(), moment()])
          break;
        default:
          setRangeDate([moment(), moment()])
      }
    }else {
      message.info('Seleccione una sucursal')
    }
  }

  const onChangeRangeDate = (dates) => {
    setRangeDate(dates)
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
        key: "sTypeService",
        dataIndex: "sTypeService",
        title: "TIPO DE SERVICIO",
        width: 60,
        align: "center"
    },
    {
        key: "nNumberTable",
        dataIndex: "nNumberTable",
        title: "NÚMERO DE MESA",
        width: 60,
        align: "right"
    },
    {
        key: "nPriceTotal",
        dataIndex: "nPriceTotal",
        title: "PRECIO TOTAL",
        width: 60,
        align: "right",
        render: value => value ? currency.format(value, currencyFE) : '0.00'
    },
    {
        key: "dCreated",
        dataIndex: "dCreated",
        title: "CREADO",
        width: 60,
        align: "center"
    },
    {
        key: "dDelivered",
        dataIndex: "dDelivered",
        title: "ENTREGADO",
        width: 60,
        align: "center"
    },
    {
        key: "dRequestPayment",
        dataIndex: "dRequestPayment",
        title: "FINALIZADO",
        width: 60,
        align: "center"
    },

  ]
  //FALTA IMPLEMENTAR FILTRO
  useEffect(() => {
    if(authSucursal){
      handleFilter();
    }
  }, [authSucursal?.nIdBranchOffice])

  return (
    <div className='h-screen'>
      {
        sRol === "administrador" ?
        <div>
          <Collapse defaultActiveKey={['1']} className="my-3 py-0" >
            <Panel header="Filtro" key="1">
              <Row gutter={12}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-start">
                    <RangePicker 
                      value={rangeDate}
                      onChange={onChangeRangeDate}
                      renderExtraFooter={() => [
                      <Button key="1" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("currentYear")}>
                        Año actual
                      </Button>,
                      <Button key="2" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("lastMonth")}>
                        Mes pasado
                      </Button>,
                      <Button key="3" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("currentMonth")}>
                        Mes actual
                      </Button>,
                      <Button key="4" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("lastWeek")}>
                        Semana pasada
                      </Button>,
                      <Button key="5" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("currentWeek")}>
                        Semana actual
                      </Button>,
                      <Button key="6" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("yesterday")}>
                        Ayer
                      </Button>,
                      <Button key="7" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("today")}>
                        Hoy
                      </Button>
                    ]} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-end">
                  <Button onClick={handleFilter} type="primary" className="bg-primary">
                    <div className='flex justify-center'>
                      <FilterOutlined className='mt-1 mr-2'/>
                      <p>Filtrar</p>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Card
              {...cardProps}
              title="Lista de ventas"
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
                  rowKey={(sale) => sale.nIdOrder}
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

export default Sales;