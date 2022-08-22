import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Modal } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { cardProps, tableProps } from '../../../util/config';
import FormBranchOffice from './formBranchOffice';
import { rxDeleteBranchOffice, rxGetBranchOffices, rxShowFormBranchOff, rxBranchOffSelected } from '../../../appRedux/actions';
import Permissions from '../../../components/Permissions';
import { usePermission } from '../../../Hooks/usePermission';
import PIconEditDelete from '../../../components/PIconEditDelete';
import PButton from '../../../components/PButton';

const BranchOffices = () => {
  const { 
    loadingListBranchOff,
    listBranchOffices,
    showFormBranchOffice,
    branchOfficeSelected,
    loadingDeleteBranchOff,
    loadingCreateBranchOff,
    loadingUpdateBranchOff
  } = useSelector(state => state.get("branchOffices"));

  const dispatch = useDispatch();

  const permAdd = usePermission("configurations.branchoffices.add");
  const permEdit = usePermission("configurations.branchoffices.edit");
  const permDelete = usePermission("configurations.branchoffices.delete");

  const handleViewFormBranchOffice = () => {
    dispatch(rxBranchOffSelected(null))
    dispatch(rxShowFormBranchOff(true))
  }

  //TODO: EDIT BRANCHOFFICE
  const handleEditBranchOffice = (branchOffice) => {
    dispatch(rxBranchOffSelected(branchOffice))
    dispatch(rxShowFormBranchOff(true))
  }
  //TODO: DELETE BRANCHOFFICE
  const handleDeleteBranchOffice = (branchOffice) => {
    Modal.confirm({
        centered: true,
        title: "Mensaje de Confirmación",
        content: <p>¿Desea realmente eliminar la sucursal <strong>{branchOffice.sBranchOffice}</strong>?</p>,
        okText: "Sí, eliminar",
        cancelText: "Cancelar",
        cancelButtonProps: { type: "text" },
        onOk: () => {
            dispatch(rxDeleteBranchOffice(branchOffice.nIdBranchOffice))
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
        key: "sBranchOffice",
        dataIndex: "sBranchOffice",
        title: "Sucursal",
        width: 200,
        align: "center",
        render: (value) => value ? value : "-"
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 30,
        align: "center",
        render: (_, branchOffice) => (
            <PIconEditDelete 
                permissionEdit={permEdit}
                permissionDelete={permDelete}
                handleClickEdit={() => handleEditBranchOffice(branchOffice)} 
                handleClickDelete={() => handleDeleteBranchOffice(branchOffice)}
                spinningEdit={loadingUpdateBranchOff}
                spinningDelete={loadingDeleteBranchOff}
            />
        )
    }
  ]
  
  //TODO: INIT - GET ALL BRANCHOFFICES
  useEffect(() => {
    dispatch(rxGetBranchOffices());
    // eslint-disable-next-line
  }, [loadingDeleteBranchOff, loadingCreateBranchOff, loadingUpdateBranchOff])

  return (
    <Permissions permission='configurations.branchoffices'>  
        <>
                    <Card
                        {...cardProps}
                        title={
                            <div className='flex justify-start'>
                                <HomeOutlined className='mt-1 mr-2'/> 
                                <p>Lista de Sucursales</p>
                            </div>
                        }
                        extra={
                            <PButton
                                permission={permAdd}
                                handleClick={handleViewFormBranchOffice}
                                loading={loadingCreateBranchOff}
                                icon={<PlusOutlined className='mt-1 mr-2' />}
                                text="Agregar sucursal"
                            />
                        }
                    >
                        <Table
                            {...tableProps}
                            bordered
                            columns={columns}
                            loading={loadingListBranchOff}
                            dataSource={listBranchOffices}
                            rowKey={(branchOffice) => branchOffice?.nIdBranchOffice}
                            rowClassName={(branchOffice) => branchOffice?.nIdBranchOffice === branchOfficeSelected?.nIdBranchOffice ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                            scroll={{x: "80vw", y: "65vh"}}
                            onRow={(branchOffice) => ({
                                onClick: () => {
                                    dispatch(rxBranchOffSelected(branchOffice))
                                },
                                onDoubleClick: () => {
                                    if(permEdit){
                                        handleEditBranchOffice(branchOffice)
                                    }
                                }
                            })}
                        />
                    </Card>
                    { 
                        showFormBranchOffice && 
                        <FormBranchOffice />
                    }
        </>
    </Permissions>
  )
}

export default BranchOffices;