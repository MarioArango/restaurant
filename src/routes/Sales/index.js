import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Collapse, Select, Form, DatePicker } from 'antd';
import { cardProps, customScroll, tableProps } from '../../util/config';
import { rxGetSales} from '../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const Sales = () => {
  const { 
    loadingListSales,
    listSales
  } = useSelector(state => state.get("sales"));

  const dispatch = useDispatch();

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
    <div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Filtro" key="1">
            <Form>
              <Item>
                <Select
                  loading={false}

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
              <Item>
              <RangePicker renderExtraFooter={() => 'extra footer'} />
              </Item>
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
  )
}

export default Sales;