import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Table, Card, Tooltip, Modal, Spin, Result, Tag } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { cardProps, tableProps } from '../../../util/config';
import { useAuth } from '../../../Hooks/auth';
import FormRol from './FormRol';
import { rxDeleteRol, rxGetRols, rxShowFormRol, rxRolSelected } from '../../../appRedux/actions';
import Permissions from '../../../components/Permissions';

const Rols = () => {
  const { 
    loadingListRols,
    listRols,
    showFormRol,
    rolSelected,
    loadingDeleteRol,
    loadingCreateRol,
    loadingUpdateRol
  } = useSelector(state => state.get("rols"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const handleViewFormRol = () => {
    dispatch(rxRolSelected(null))
    dispatch(rxShowFormRol(true))
  }

  //TODO: EDIT ROL
  const handleEditRol = (rol) => {
    dispatch(rxRolSelected(rol))
    dispatch(rxShowFormRol(true))
  }
  //TODO: DELETE ROL
  const handleDeleteRol = (rol) => {
    Modal.confirm({
        centered: true,
        title: "Mensaje de Confirmación",
        content: <p>¿Desea realmente eliminar el Rol <strong>{rol.sRol}</strong>?</p>,
        okText: "Sí, eliminar",
        cancelText: "Cancelar",
        cancelButtonProps: { type: "text" },
        onOk: () => {
            dispatch(rxDeleteRol(rol.nIdRol))
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
        key: "sRol",
        dataIndex: "sRol",
        title: "Rol",
        width: 20,
        align: "center",
        render: (value) => value ? <Tag color="blue">{value}</Tag> : "-"
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 5,
        align: "center",
        render: (_, rol) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <Spin spinning={loadingUpdateRol}>
                        <EditTwoTone onClick={() => handleEditRol(rol)} />
                    </Spin>
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDeleteRol}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteRol(rol)} />
                    </Spin>
                </Tooltip>
            </div>
        )
    }
  ]
  
  //TODO: INIT - GET ALL USERS
  useEffect(() => {
    dispatch(rxGetRols());
    // eslint-disable-next-line
  }, [loadingDeleteRol, loadingCreateRol, loadingUpdateRol])

  return (
    <Permissions permission='configurations.rols'>
        <>
                <Card
                {...cardProps}
                title={
                    <div className='flex justify-start'>
                        <UserOutlined className='mt-1 mr-2'/> 
                        <p>Roles Registrados</p>
                    </div>
                }
                extra={
                    <Button
                        type="primary"
                        className='bg-primary'
                        onClick={handleViewFormRol}
                    >
                        <div className='flex justify-between'>
                            <PlusOutlined className='mt-1 mr-2'/>
                            <p>Agregar Rol</p>
                        </div>
                        
                    </Button>
                }
            >
                <Table
                    {...tableProps}
                    bordered
                    columns={columns}
                    loading={loadingListRols}
                    dataSource={listRols}
                    rowKey={(rol) => rol.nIdRol}
                    rowClassName={(rol) => rol?.nIdRol === rolSelected?.nIdRol ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                    scroll={{x: "80vw", y: "65vh"}}
                    onRow={(rol) => ({
                        onClick: () => {
                            dispatch(rxRolSelected(rol))
                        },
                        onDoubleClick: () => {
                            handleEditRol(rol)
                        }
                    })}
                />
                </Card>
                { 
                    showFormRol && 
                    <FormRol />
                }
        </>
    </Permissions>
  )
}

export default Rols;