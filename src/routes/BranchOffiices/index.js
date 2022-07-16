import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Table, Card, Tooltip, Modal, Spin } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { cardProps, customScroll, tableProps } from '../../util/config';
import FormBranchOffice from './formBranchOffice';
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

  const handleViewFormBranchOffice = () => {
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
        width: 5,
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
        width: 20,
        align: "center",
        render: (_, branchOffice) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <EditTwoTone onClick={() => handleEditBranchOffice(branchOffice)} />
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
    <>
        <Card
            {...cardProps}
            title="Lista de Sucursales"
            extra={
                <Button
                    type="primary"
                    className='bg-primary'
                    icon={<PlusOutlined/>}
                    onClick={handleViewFormBranchOffice}
                >
                    Agregar sucursal
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
                        handleViewFormBranchOffice()
                    }
                })}
            />
        </Card>
        { 
          showFormBranchOffice && 
          <FormBranchOffice />
        }
    </>
  )
}

export default BranchOffices;