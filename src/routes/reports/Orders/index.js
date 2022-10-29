import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, message, Collapse, Row, Form, Input, Col, Button } from 'antd';
import { cardProps, dateFormatList, tableProps } from '../../../util/config';
import { rxReportOrders } from '../../../appRedux/actions';
import moment from 'moment';
import RangeDateFilter from '../../../components/RangeDateFilter';
import Excel from '../../../components/Excel';
import Permissions from '../../../components/Permissions';
import { usePermission } from '../../../Hooks/usePermission';
import { FilterOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Item } = Form;

const Orders = () => {

  const [rangeDate, setRangeDate] = useState([moment(), moment()]);
  
  const { loadingListReportOrders, listReportOrders } = useSelector(state => state.get("reports"));
  const { authSucursal } = useSelector(state => state.get("users"));

  const [ form ] = Form.useForm();
  const { validateFields } = form;

  const dispatch = useDispatch();

  const permExportExcel = usePermission("reports.time-orders.export-excel");

  const handleFilter = () => {
    validateFields().then(values => {
      if(authSucursal){
        const from = moment(rangeDate[0]).format(dateFormatList[0]) + " 00:00:00";
        const to = moment(rangeDate[1]).format(dateFormatList[0]) + " 24:00:00";
        dispatch(rxReportOrders(authSucursal.nIdBranchOffice, from, to, values.nNumberTable))
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
    <Permissions permission='reports.time-orders'>
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
              title="Reporte de pedidos"
              extra={
                <Excel permission={permExportExcel} dataSource={listReportOrders} columns={columns} fileName="Reporte_pedidos"/>
              }
          >
              <Table
                  {...tableProps}
                  bordered
                  columns={columns}
                  loading={loadingListReportOrders}
                  dataSource={listReportOrders}
                  rowKey={() => Math.random()}
                  rowClassName={(_) => "cursor-pointer"}
                  scroll={{y: "55vh", x: 1000}}
              />
          </Card>
      </>
    </Permissions>
  )
}

export default Orders;

