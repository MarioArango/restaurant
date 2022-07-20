import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Collapse, Select, Form, DatePicker, Result, Row, Col, message} from 'antd';
import { cardProps, customScroll, tableProps } from '../../util/config';
import { useAuth } from '../../Hooks/auth';
import { rxGetSales } from '../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const Sales = () => {
  const { 
    loadingListSales,
    listSales
  } = useSelector(state => state.get("sales"));

  const { authSucursal } = useSelector(state => state.get("users"));

  //dispatch(rxGetSales(authSucursal))

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const [form] = Form.useForm();
  const { validateFields } = form;

  const handleSubmit = () => {
    validateFields().then((values) => {
  
    }).catch(error => {
      message.error("Error del servidor.")
    })
  }

  const columns = [
    {
        key: "index",
        title: "#",
        width: 5,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    // {
    //     key: "sUsername",
    //     dataIndex: "sUsername",
    //     title: "Usuario",
    //     width: 20,
    //     align: "center",
    //     render: (value) => value ? value : "-"
    // },

  ]
  //FALTA IMPLEMENTAR FILTRO
  return (
    <div className='h-screen'>
      {
        sRol === "administrador" ?
        <div>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Filtro" key="1">
              <Form
                name='form-sales'
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
              >
                <Row gutter={12}>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Item label="Sucursal" name="sBranchOffice">
                      <Select
                        loading={false}
                        style={{width: "320px"}}
                      >
                        {
                          [].map((s, index) => (
                            <Option key={index} value={s.nIdBranchOffice}>
                              {s.sBranchOffice}
                            </Option>
                          ))
                        }
                      </Select>
                    </Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-end">
                    <Item label="Rango de fecha" name="rangeDate">
                      <RangePicker renderExtraFooter={() => 'extra footer'} />
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
                  rowClassName={(_) => "bg-blue-50 cursor-pointer"}
                  scroll={customScroll()}
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