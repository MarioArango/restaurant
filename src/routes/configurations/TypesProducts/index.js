import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Modal } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { cardProps, tableProps } from '../../../util/config';
import FormTypesProduct from './formTypesProduct';
import { rxDeleteTypeProduct, rxGetTypesProducts, rxShowFormTypeProduct, rxTypeProductSelected } from '../../../appRedux/actions';
import Permissions from '../../../components/Permissions';
import { usePermission } from '../../../Hooks/usePermission';
import PIconEditDelete from '../../../components/PIconEditDelete';
import PButton from '../../../components/PButton';
import withFilterTable from '../../../HOC/withFilterTable';

const TypesProducts = (props) => {
  const { getColumnSearchProps } = props;
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

  const permAdd = usePermission("configurations.types-products.add");
  const permEdit = usePermission("configurations.types-products.edit");
  const permDelete = usePermission("configurations.types-products.delete");


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
        ...getColumnSearchProps('sTypeProduct')
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 30,
        align: "center",
        render: (_, typeProduct) => (
            <PIconEditDelete  
                permissionEdit={permEdit}
                permissionDelete={permDelete}
                handleClickEdit={() => handleEditTypeProduct(typeProduct)} 
                handleClickDelete={() => handleDeleteTypeProduct(typeProduct)}
                spinningEdit={loadingUpdateTypeProduct}
                spinningDelete={loadingDeleteTypeProduct}
            />
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
    <Permissions permission='configurations.types-products'>  
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
                            <PButton
                                permission={permAdd}
                                handleClick={handleViewFormTypeProduct}
                                loading={loadingCreateTypeProduct}
                                icon={<PlusOutlined className='mt-1 mr-2' />}
                                text="Agregar"
                            />
                        }
                    >
                        <Table
                            {...tableProps}
                            bordered
                            columns={columns}
                            loading={loadingListTypesProducts}
                            dataSource={listTypesProducts}
                            rowKey={(typeProduct) => typeProduct?.nIdTypeProduct}
                            rowClassName={(typeProduct) => typeProduct?.nIdTypeProduct === typeProductSelected?.nIdTypeProduct ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                            scroll={{x: "80vw", y: "65vh"}}
                            onRow={(typeProduct) => ({
                                onClick: () => {
                                    dispatch(rxTypeProductSelected(typeProduct))
                                },
                                onDoubleClick: () => {
                                    if(permEdit){
                                        handleEditTypeProduct(typeProduct)
                                    }
                                }
                            })}
                        />
                    </Card>
                    { 
                        showFormTypeProduct && 
                        <FormTypesProduct />
                    }
        </>
    </Permissions>
  )
}

export default withFilterTable(TypesProducts);