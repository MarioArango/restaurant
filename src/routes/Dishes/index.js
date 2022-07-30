import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currency from 'currency-formatter';
import { DeleteTwoTone, EditTwoTone, PlusOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Button, Table, Card, Modal, Tooltip, Result, Checkbox} from 'antd';
import { cardProps, currencyFE, tableProps } from '../../util/config';
import { useAuth } from '../../Hooks/auth';
import FormDish from './FormDish';
import { 
    rxGetDishes, 
    rxDeleteDish, 
    rxDishSelected, 
    rxShowFormDishes, 
    rxUpdateDish
} from '../../appRedux/actions';

const Dishes = () => {
  //TODO: REDUX STATE
  const { 
    listDishes, 
    loadingListDishes, 
    dishSelected,
    showFormDishes,
    loadingDeleteDish,
    loadingAddDish, 
    loadingUpdateDish
  } = useSelector(state => state.get("dishes"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  //TODO: SHOW FORM DISH
  const handleViewFormDish = () => {
    dispatch(rxDishSelected(null))
    dispatch(rxShowFormDishes(true))
  }

   //TODO: EDIT DISH
   const handleEditDish = (dish) => {
    dispatch(rxDishSelected(dish))
    dispatch(rxShowFormDishes(true))
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
            dispatch(rxDeleteDish(dish.nIdDish))
        },
        onCancel: () => { }
      })
  }

  //TODO: UPDATE STATE ACTIVE DISH
  const handleChangeActive = (e, dish) => {
    if(dish){
        const dishUp = {
            ...dish,
            bActive: e.target.checked
        }
        dispatch(rxUpdateDish(dishUp.nIdDish, dishUp))
    }
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
        title: "Precio unit.",
        width: 80,
        align: "right",
        render: value => value ? currency.format(Number(value), currencyFE) : '0.00'
    },
    {
        key: "bActive",
        dataIndex: "bActive",
        title: "Activo",
        width: 80,
        align: "center",
        render: (value, dish) => <Checkbox checked={value} onChange={(e) => handleChangeActive(e, dish)}/>
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
                    <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteDish(dish)} />
                </Tooltip>
            </div>
        )
    }
  ]

  //TODO: GET ALL DISHES IN THE BUSINESS
  useEffect(() => {
    if(authSucursal){
        dispatch(rxGetDishes(authSucursal.nIdBranchOffice));
    }
  }, [authSucursal?.nIdBranchOffice, loadingDeleteDish, loadingAddDish, loadingUpdateDish])

  return (
    <div className='h-screen'>  
        {
            sRol === "administrador"?
            <>
                <Card
                {...cardProps}
                title={
                    <div className='flex justify-start'>
                        <ScheduleOutlined className='mt-1 mr-2'/> 
                        <p>Lista de Platos</p>
                    </div>
                }
                extra={
                    <Button
                        type="primary"
                        className='bg-primary'
                        onClick={handleViewFormDish}
                    >
                        <div className='flex justify-between'>
                            <PlusOutlined className='mt-1 mr-2'/>
                            <p>Agregar plato</p>
                        </div>
                    </Button>
                }
            >
                <Table
                    {...tableProps}
                    bordered
                    columns={columns}
                    loading={loadingListDishes || loadingUpdateDish || loadingDeleteDish}
                    dataSource={listDishes}
                    rowKey={(dish) => dish.nIdDish}
                    rowClassName={(dish) => dish?.nIdDish === dishSelected?.nIdDish ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                    onRow={(dish) => ({
                        onClick: () => {
                            dispatch(rxDishSelected(dish))
                        },
                        onDoubleClick: () => {
                            handleEditDish(dish)
                        }
                    })}
                />
                </Card>
                { 
                showFormDishes && <FormDish/>
                }
            </>
            : <Result
                status="403"
                title="403"
                subTitle="Lo sentimos, no está autorizado para acceder a esta página."
            />
        }
    </div>
  )
}

export default Dishes;