import { useSelector } from 'react-redux';
import { Collapse, DatePicker, Row, Col, message, Button} from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const RangeDateFilter = ({ handleFilter, rangeDate, setRangeDate }) => {
    
  const { authSucursal } = useSelector(state => state.get("users"));

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

  return (
    <Collapse defaultActiveKey={['1']} className="my-3 py-0" >
        <Panel header="Filtro" key="1">
          <Row gutter={12}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-start">
                <RangePicker 
                  allowClear={false}
                  value={rangeDate}
                  onChange={onChangeRangeDate}
                  renderExtraFooter={() => [
                  <Button key="1" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("currentYear")}>
                    Año actual
                  </Button>,
                  <Button key="2" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("lastMonth")}>
                    Mes pasado
                  </Button>,
                  <Button key="3" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("currentMonth")}>
                    Mes actual
                  </Button>,
                  <Button key="4" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("lastWeek")}>
                    Semana pasada
                  </Button>,
                  <Button key="5" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("currentWeek")}>
                    Semana actual
                  </Button>,
                  <Button key="6" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("yesterday")}>
                    Ayer
                  </Button>,
                  <Button key="7" size='small' type='primary' className='mr-2' onClick={() => handleSelectDate("today")}>
                    Hoy
                  </Button>
                ]} />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} className="flex justify-end">
              <Button onClick={handleFilter} type="primary">
                <div className='flex justify-center'>
                  <FilterOutlined className='mt-1 mr-2'/>
                  <p>Filtrar</p>
                </div>
              </Button>
            </Col>
          </Row>
        </Panel>
    </Collapse>
  )
}

export default RangeDateFilter;