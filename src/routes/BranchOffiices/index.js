import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Table, Card, Tooltip, Modal, Spin, Result } from 'antd';
import { DeleteTwoTone, EditTwoTone, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { cardProps, customScroll, tableProps } from '../../util/config';
import FormBranchOffice from './formBranchOffice';
import { useAuth } from '../../Hooks/auth';
import { rxDeleteBranchOffice, rxGetBranchOffices, rxShowFormBranchOff, rxBranchOffSelected } from '../../appRedux/actions';

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

  const { sRol } = useAuth()

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
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <Spin spinning={loadingUpdateBranchOff}>
                        <EditTwoTone onClick={() => handleEditBranchOffice(branchOffice)} />
                    </Spin>
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDeleteBranchOff}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteBranchOffice(branchOffice)} />
                    </Spin>
                </Tooltip>
            </div>
        )
    }
  ]
  
  //TODO: INIT - GET ALL BRANCHOFFICES
  useEffect(() => {
    dispatch(rxGetBranchOffices());
  }, [loadingDeleteBranchOff, loadingCreateBranchOff, loadingUpdateBranchOff])

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
                                <p>Lista de Sucursales</p>
                            </div>
                        }
                        extra={
                            <Button
                                type="primary"
                                className='bg-primary'
                                onClick={handleViewFormBranchOffice}
                            >
                                <div className='flex justify-between'>
                                    <PlusOutlined className='mt-1 mr-2'/>
                                    <p>Agregar sucursal</p>
                                </div>
                            </Button>
                        }
                    >
                        <Table
                            {...tableProps}
                            bordered
                            columns={columns}
                            loading={loadingListBranchOff}
                            dataSource={listBranchOffices}
                            rowKey={(branchOffice) => branchOffice.nIdBranchOffice}
                            rowClassName={(branchOffice) => branchOffice?.nIdBranchOffice === branchOfficeSelected?.nIdBranchOffice ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                            scroll={customScroll()}
                            onRow={(branchOffice) => ({
                                onClick: () => {
                                    dispatch(rxBranchOffSelected(branchOffice))
                                },
                                onDoubleClick: () => {
                                    handleEditBranchOffice(branchOffice)
                                }
                            })}
                        />
                    </Card>
                    { 
                        showFormBranchOffice && 
                        <FormBranchOffice />
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

export default BranchOffices;