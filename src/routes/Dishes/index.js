import { useEffect, useState } from 'react';
import currency from 'currency-formatter';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table, Card } from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../util/config';
import FormDish from './FormDish';
import { rxGetDishes } from '../../apis';

const Dishes = () => {
  //TODO: STATE OWN COMPONENT
  const [listDishes, setListDishes] = useState([]);
  const [ view, setView ] = useState(false);
  const [ dishSelected, setDishSelected ] = useState(null);

  //TODO: SHOW FORM DISH
  const handleViewFormDish = () => {
    setView(true)
  }

  //TODO: GET ALL DISHES 
  const getDishes = () => {
    rxGetDishes((querySnapshot) => {
        const dishes = []
        querySnapshot.forEach(doc => {
            dishes.push({...doc.data(), nIdDish: doc.id}) 
        })
        setListDishes(dishes)
    })
  }

  //TODO: COLUMNS TABLE
  const columns = [
    {
        key: "index",
        title: "#",
        width: 40,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sName",
        dataIndex: "sName",
        title: "Nombre",
        width: 120,
        align: "center",
    },
    {
        key: "sType",
        dataIndex: "sType",
        title: "Tipo",
        width: 80,
        align: "center",
    },
    {
        key: "nPrice",
        dataIndex: "nPrice",
        title: "nPrice",
        width: 80,
        align: "right",
        render: value => "S/." + (value.nPrice ? currency.format(Number(value.nPrice), currencyFE) : '0.00')
    },
  ]

  //TODO: GET ALL DISHES IN THE BUSINESS
  useEffect(() => {
    getDishes();
  }, [])

  return (
    <>
        <Card
            {...cardProps}
            title="Lista de Platos."
            extra={
                <Button
                    type="primary"
                    className='bg-primary'
                    icon={<PlusOutlined/>}
                    onClick={handleViewFormDish}
                >
                    Agregar plato
                </Button>
            }
        >
            <Table
                {...tableProps}
                bordered
                columns={columns}
                loading={false}
                dataSource={listDishes}
                rowKey={(dish) => dish.nIdDish}
                rowClassName={(dish) => dish?.nIdDish === dishSelected?.nIdDish ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                scroll={customScroll()}
                onRow={(dish) => ({
                    onClick: () => {
                        setDishSelected(dish)
                    },
                    onDoubleClick: () => {
                        handleViewFormDish()
                    }
                })}
            />
        </Card>
        { 
          view && 
          <FormDish 
            view={view}
            setView={setView} 
            dishSelected={dishSelected} 
            setDishSelected={setDishSelected}/>
        }
    </>
  )
}

export default Dishes;