import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Table, Card, Tooltip, Modal, Spin, Result } from 'antd';
import { DeleteTwoTone, EditTwoTone, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { cardProps, tableProps } from '../../../util/config';
import FormTypesProduct from './formTypesProduct';
import { useAuth } from '../../../Hooks/auth';
import { rxDeleteTypeProduct, rxGetTypesProducts, rxShowFormTypeProduct, rxTypeProductSelected } from '../../../appRedux/actions';

const TypesProducts = () => {
  const { 
    loadingListTypesProducts,
    listTypesProducts,
    showFormTypeProduct,
    typeProductSelected,
    loadingDeleteTypeProduct,
    loadingCreateTypeProduct,
    loadingUpdateTypeProduct
  } = useSelector(state => state.get("typesProducts"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const handleViewFormTypeProduct = () => {
    dispatch(rxTypeProductSelected(null))
    dispatch(rxShowFormTypeProduct(true))
  }

  //TODO: EDIT TYPE PRODUCT
  const handleEditTypeProduct = (typeProduct) => {
    dispatch(rxTypeProductSelected(typeProduct))
    dispatch(rxShowFormTypeProduct(true))
  }
  //TODO: DELETE TYPE PRODUCT
  const handleDeleteTypeProduct = (typeProduct) => {
    Modal.confirm({
        centered: true,
        title: "Mensaje de Confirmación",
        content: <p>¿Desea realmente eliminar el tipo de producto <strong>{typeProduct.sTypeProduct}</strong>?</p>,
        okText: "Sí, eliminar",
        cancelText: "Cancelar",
        cancelButtonProps: { type: "text" },
        onOk: () => {
            dispatch(rxDeleteTypeProduct(typeProduct.nIdTypeProduct))
        },
        onCancel: () => { }
      })
  }

  const columns = [
    {
        key: "index",
        title: "#",
        width: 15,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sTypeProduct",
        dataIndex: "sTypeProduct",
        title: "Tipo de Producto",
        width: 200,
        align: "center",
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 30,
        align: "center",
        render: (_, typeProduct) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <Spin spinning={loadingUpdateTypeProduct}>
                        <EditTwoTone onClick={() => handleEditTypeProduct(typeProduct)} />
                    </Spin>
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDeleteTypeProduct}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteTypeProduct(typeProduct)} />
                    </Spin>
                </Tooltip>
            </div>
        )
    }
  ]
  
  //TODO: INIT - GET ALL TYPES PRODUCTS
  useEffect(() => {
    if(authSucursal){
        dispatch(rxGetTypesProducts(authSucursal.nIdBranchOffice));
    }
    // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice, loadingDeleteTypeProduct, loadingCreateTypeProduct, loadingUpdateTypeProduct])

  return (
    <div className='h-screen'>  
        {
            sRol === "administrador"?
                <>
                    <Card
                        {...cardProps}
                        title={
                            <div className='flex justify-start'>
                                <HomeOutlined className='mt-1 mr-2'/> 
                                <p>Tipos de productos</p>
                            </div>
                        }
                        extra={
                            <Button
                                type="primary"
                                className='bg-primary'
                                onClick={handleViewFormTypeProduct}
                            >
                                <div className='flex justify-between'>
                                    <PlusOutlined className='mt-1 mr-2'/>
                                    <p>Agregar</p>
                                </div>
                            </Button>
                        }
                    >
                        <Table
                            {...tableProps}
                            bordered
                            columns={columns}
                            loading={loadingListTypesProducts}
                            dataSource={listTypesProducts}
                            rowKey={(typeProduct) => typeProduct.nIdTypeProduct}
                            rowClassName={(typeProduct) => typeProduct?.nIdTypeProduct === typeProductSelected?.nIdTypeProduct ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                            scroll={{x: "80vw", y: "65vh"}}
                            onRow={(typeProduct) => ({
                                onClick: () => {
                                    dispatch(rxTypeProductSelected(typeProduct))
                                },
                                onDoubleClick: () => {
                                    handleEditTypeProduct(typeProduct)
                                }
                            })}
                        />
                    </Card>
                    { 
                        showFormTypeProduct && 
                        <FormTypesProduct />
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

export default TypesProducts;