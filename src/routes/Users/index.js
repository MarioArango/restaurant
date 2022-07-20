import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Table, Card, Tooltip, Modal, Spin, Result } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { cardProps, customScroll, tableProps } from '../../util/config';
import { useAuth } from '../../Hooks/auth';
import FormUser from './FormUser';
import { rxDeleteUser, rxGetUsers, rxShowFormUser, rxUserSelected } from '../../appRedux/actions';

const Users = () => {
  const { 
    loadingListUsers,
    listUsers,
    showFormUser,
    userSelected,
    loadingDeleteUser,
    loadingCreateUser,
    loadingUpdateUser
  } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const { sRol } = useAuth()

  const handleViewFormUser = () => {
    dispatch(rxUserSelected(null))
    dispatch(rxShowFormUser(true))
  }

  //TODO: EDIT USER
  const handleEditUser = (user) => {
    dispatch(rxUserSelected(user))
    dispatch(rxShowFormUser(true))
  }
  //TODO: DELETE USER
  const handleDeleteUser = (user) => {
    Modal.confirm({
        centered: true,
        title: "Mensaje de Confirmación",
        content: <p>¿Desea realmente eliminar al usuario <strong>{user.sUsername}</strong>?</p>,
        okText: "Sí, eliminar",
        cancelText: "Cancelar",
        cancelButtonProps: { type: "text" },
        onOk: () => {
            dispatch(rxDeleteUser(user.nIdUser))
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
        key: "sUsername",
        dataIndex: "sUsername",
        title: "Usuario",
        width: 45,
        align: "center",
        render: (value) => value ? value : "-"
    },
    {
        key: "sRol",
        dataIndex: "sRol",
        title: "Rol",
        width: 20,
        align: "center",
        render: (value) => value ? value : "-"
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 10,
        align: "center",
        render: (_, user) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <Spin spinning={loadingUpdateUser}>
                        <EditTwoTone onClick={() => handleEditUser(user)} />
                    </Spin>
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDeleteUser}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteUser(user)} />
                    </Spin>
                </Tooltip>
            </div>
        )
    }
  ]
  
  //TODO: INIT - GET ALL USERS
  useEffect(() => {
    dispatch(rxGetUsers());
  }, [loadingDeleteUser, loadingCreateUser, loadingUpdateUser])

  return (
    <div className='h-screen'>
        {sRol === "administrador" ?
            <>
                <Card
                {...cardProps}
                title={
                    <div className='flex justify-start'>
                        <UserOutlined className='mt-1 mr-2'/> 
                        <p>Usuarios Registrados</p>
                    </div>
                }
                extra={
                    <Button
                        type="primary"
                        className='bg-primary'
                        onClick={handleViewFormUser}
                    >
                        <div className='flex justify-between'>
                            <PlusOutlined className='mt-1 mr-2'/>
                            <p>Agregar usuario</p>
                        </div>
                        
                    </Button>
                }
            >
                <Table
                    {...tableProps}
                    bordered
                    columns={columns}
                    loading={loadingListUsers}
                    dataSource={listUsers}
                    rowKey={(user) => user.nIdUser}
                    rowClassName={(user) => user?.nIdUser === userSelected?.nIdUser ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                    scroll={customScroll()}
                    onRow={(user) => ({
                        onClick: () => {
                            dispatch(rxUserSelected(user))
                        },
                        onDoubleClick: () => {
                            handleEditUser(user)
                        }
                    })}
                />
                </Card>
                { 
                    showFormUser && 
                    <FormUser />
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

export default Users;