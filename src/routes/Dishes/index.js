import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currency from 'currency-formatter';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Table, Card, Modal, Tooltip, Spin, Result} from 'antd';
import { cardProps, currencyFE, customScroll, tableProps } from '../../util/config';
import { useAuth } from '../../Hooks/auth';
import FormDish from './FormDish';
import { 
    rxGetDishes, 
    rxDeleteDish, 
    rxDishSelected, 
    rxShowFormDishes 
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
        key: "",
        dataIndex: "",
        title: "",
        width: 50,
        align: "center",
        render: (_, dish) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <Spin spinning={loadingUpdateDish}>
                        <EditTwoTone onClick={() => handleEditDish(dish)} />
                    </Spin>
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDeleteDish}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteDish(dish)} />
                    </Spin>
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
    <>  
        {
            sRol === "administrador"?
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
                    loading={loadingListDishes}
                    dataSource={listDishes}
                    rowKey={(dish) => dish.nIdDish}
                    rowClassName={(dish) => dish?.nIdDish === dishSelected?.nIdDish ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                    scroll={customScroll()}
                    onRow={(dish) => ({
                        onClick: () => {
                            dispatch(rxDishSelected(dish))
                        },
                        onDoubleClick: () => {
                            handleViewFormDish()
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
    </>
  )
}

export default Dishes;