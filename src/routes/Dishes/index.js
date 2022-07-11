import { useEffect, useState } from 'react';
import currency from 'currency-formatter';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Table, Card, Modal, Tooltip, Spin} from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../util/config';
import FormDish from './FormDish';
import { rxGetDishes, rxDeleteDish } from '../../apis';

const Dishes = () => {
  //TODO: STATE OWN COMPONENT
  const [listDishes, setListDishes] = useState([]);
  const [ view, setView ] = useState(false);
  const [ dishSelected, setDishSelected ] = useState(null);
  const [ loadingDelete, setLoadingDelete ] = useState(false);

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

   //TODO: EDIT DISH
   const handleEditDish = (dish) => {
    setDishSelected(dish)
    setView(true)
  }

  //TODO: DELETE DISH
  const handleDeleteDish = (dish) => {
    Modal.confirm({
        centered: true,
        title: "Mensaje de Confirmación",
        content: <p>¿Desea realmente eliminar el plato <strong>{dish.sName}</strong>?</p>,
        okText: "Sí, eliminar",
        cancelText: "Cancelar",
        cancelButtonProps: { type: "text" },
        onOk: () => {
                setLoadingDelete(true)
            rxDeleteDish(dish.nIdDish, () => {
                setLoadingDelete(false)
            })
        },
        onCancel: () => { }
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
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 50,
        align: "center",
        render: (_, dish) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <EditTwoTone onClick={() => handleEditDish(dish)} />
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDelete}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteDish(dish)} />
                    </Spin>
                </Tooltip>
            </div>
        )
    }
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