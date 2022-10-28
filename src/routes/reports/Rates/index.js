import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, message, Form, Collapse, Row, Col, Input, Button } from 'antd';
import { cardProps, dateFormatList, tableProps } from '../../../util/config';
import { rxReportRates } from '../../../appRedux/actions';
import moment from 'moment';
import RangeDateFilter from '../../../components/RangeDateFilter';
import Excel from '../../../components/Excel';
import Permissions from '../../../components/Permissions';
import { usePermission } from '../../../Hooks/usePermission';
import { FilterOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Item } = Form;

const Rates = () => {

  const [rangeDate, setRangeDate] = useState([moment(), moment()]);
  
  const { loadingListReportRates, listReportRates } = useSelector(state => state.get("reports"));
  const { authSucursal } = useSelector(state => state.get("users"));

  const [ form ] = Form.useForm();
  const { validateFields } = form;

  const dispatch = useDispatch();

  const permExportExcel = usePermission("reports.rates.export-excel");


  const handleFilter = () => {
    validateFields().then(values => {
      if(authSucursal){
        const from = moment(rangeDate[0]).format(dateFormatList[0]) + " 00:00:00";
        const to = moment(rangeDate[1]).format(dateFormatList[0]) + " 24:00:00";
        dispatch(rxReportRates(authSucursal.nIdBranchOffice, from, to, values.nNumberTable))
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
            title="Reporte de ventas"
            extra={
              <Excel permission={permExportExcel} dataSource={listReportRates} columns={columns} fileName="Reporte_puntuaciones"/>
            }
        >
            <Table
                {...tableProps}
                bordered
                columns={columns}
                loading={loadingListReportRates}
                dataSource={listReportRates}
                rowKey={(rate) => rate?.nIdRate}
                rowClassName={(_) => "cursor-pointer"}
                scroll={{y: "55vh", x: 1000}}
            />
        </Card>
      </>
    </Permissions>
  )
}

export default Rates;