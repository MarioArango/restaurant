import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import currency from 'currency-formatter';
import { Table, Card, Collapse, Select, Form, DatePicker, Result, Row, Col, message, Button} from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import { rxReportSales } from '../../../appRedux/actions';
import { FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const Sales = () => {
  const [rangeDate, setRangeDate] = useState(null);
  const { 
    loadingListSales,
    listSales
  } = useSelector(state => state.get("sales"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const [form] = Form.useForm();
  const { validateFields } = form;

  const handleSubmit = () => {
    validateFields().then((values) => {
      console.log(values, "values")
      if(authSucursal){
        if(values.dRangeDate){

          dispatch(rxReportSales(authSucursal.nIdBranchOffice, rangeDate))
        }else {
          dispatch(rxReportSales(authSucursal.nIdBranchOffice))
        }
      }else {
        message.info('Seleccione una sucursal')
      }
    }).catch(_ => {
      message.error("Error del servidor.")
    })
  }

  const handleSelectDate = (type) => {
    if(authSucursal){
      switch(type){
        case "currentYear":
          setRangeDate(moment().format("YYYY"))
          break;
        case "lastYear":
          setRangeDate("")
          break;
        case "currentMonth":
          setRangeDate(moment().format("MM"))
          break;
        case "today":
          setRangeDate(moment().format("DD/MM/YYYY"))
          break;
        default:
          setRangeDate(moment().format("DD/MM/YYYY"))
      }
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
      dispatch(rxReportSales(authSucursal.nIdBranchOffice))
    }
  }, [authSucursal?.nIdBranchOffice])

  return (
    <div className='h-screen'>
      {
        sRol === "administrador" ?
        <div>
          <Collapse defaultActiveKey={['1']} className="my-3 py-0" >
            <Panel header="Filtro" key="1">
              <Form
                name='form-sales'
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
              >
                <Row gutter={12}>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-start">
                    <Item label="Rango de fecha" name="dRangeDate">
                      <RangePicker renderExtraFooter={() => [
                        <Button key="1" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("currentYear")}>
                            Año actual
                        </Button>,
                        <Button key="2" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("lastYear")}>
                            Mes pasado
                        </Button>,
                        <Button key="3" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("currentMonth")}>
                            Mes actual
                        </Button>,
                        
                        <Button key="4" size='small' type='primary' className='mr-2 bg-primary' onClick={() => handleSelectDate("today")}>
                            Hoy
                        </Button>
                      ]} />
                    </Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-end">
                    <Item label=" ">
                      <Button htmlType="submit" type="primary" className="bg-primary">
                        <div className='flex justify-center'>
                          <FilterOutlined className='mt-1 mr-2'/>
                          <p>Filtrar</p>
                        </div>
                      </Button>
                    </Item>
                  </Col>
                </Row>
              </Form>
            </Panel>
          </Collapse>
          <Card
              {...cardProps}
              title="Lista de ventas"
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