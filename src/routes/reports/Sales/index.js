import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import currency from 'currency-formatter';
import { Table, Card, message, Tooltip, Collapse, Form, Row, Col, Input, Button } from 'antd';
import { cardProps, currencyFE, dateFormatList, tableProps } from '../../../util/config';
import { rxReportSales } from '../../../appRedux/actions';
import moment from 'moment';
import RangeDateFilter from '../../../components/RangeDateFilter';
import { FilterOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Excel from '../../../components/Excel';
import Permissions from '../../../components/Permissions';
import { usePermission } from '../../../Hooks/usePermission';

const { Panel } = Collapse;
const { Item } = Form;

const Sales = () => {

  const [rangeDate, setRangeDate] = useState([moment(), moment()]);
  
  const { loadingListReportSales, listReportSales } = useSelector(state => state.get("reports"));
  const { authSucursal } = useSelector(state => state.get("users"));

  const [ form ] = Form.useForm();
  const { validateFields } = form;

  const dispatch = useDispatch();

  const permExportExcel = usePermission("reports.sales.export-excel");

  const handleFilter = () => {
    validateFields().then(values => {
      if(authSucursal){
        const from = moment(rangeDate[0]).format(dateFormatList[0]) + " 00:00:00";
        const to = moment(rangeDate[1]).format(dateFormatList[0]) + " 24:00:00";
        dispatch(rxReportSales(authSucursal.nIdBranchOffice, from, to, values.nNumberTable))
      }else {
        message.info('Seleccione una sucursal')
      }
    })
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
      width: 50,
      align: "right"
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
    <Permissions permission='reports.sales'>
      <>
          <Collapse defaultActiveKey={['1']} className="my-3 py-0">
            <Panel header="Filtro" key="1">
              <Form
                name='form-report-order'
                form={form}
                onFinish={handleFilter}
                layout="vertical"
              >
                <Row gutter={12}>
                  <Col span={4}>
                    <Item label="Mesa" name="nNumberTable">
                      <Input placeholder='Número de mesa'/>
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item name="dRangeDate" label="Rango de Fecha">
                      <RangeDateFilter rangeDate={rangeDate} setRangeDate={setRangeDate}/>
                    </Item>
                  </Col>
                  <Col span={12} className="flex justify-end">
                    <Item label=" ">
                      <Button type="primary" htmlType='submit'>
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
              title={
                <div className='flex'>
                  <p>Reporte de ventas </p>
                  <Tooltip title="Cada número de mesa esta asociada a un cliente."><InfoCircleOutlined className='mt-1 ml-2'/></Tooltip>
                </div>
              }
              extra={
                 <Excel permission={permExportExcel} dataSource={listReportSales} columns={columns} fileName="Reporte_ventas"/>
              }
          >
              <Table
                  {...tableProps}
                  bordered
                  columns={columns}
                  loading={loadingListReportSales}
                  dataSource={listReportSales}
                  rowKey={() => Math.random()}
                  rowClassName={(_) => "cursor-pointer"}
                  scroll={{y: "55vh", x: 1000}}
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
      </>
    </Permissions>
  )
}

export default Sales;