import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Tag, Tree, Modal, Tooltip, Alert } from 'antd';
import { PlusOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { cardProps, tableProps } from '../../../util/config';
import { rols } from '../Rols/rols';
import { usePermission } from '../../../Hooks/usePermission';
import PIconEditDelete from '../../../components/PIconEditDelete';
import PButton from '../../../components/PButton';
import Permissions from '../../../components/Permissions';
import FormUser from './FormUser';
import { rxDeleteUser, rxGetUsers, rxShowFormUser, rxUserSelected, rxGetRols } from '../../../appRedux/actions';


const Users = () => {

  const [ permissions, setPermissions  ] = useState(null);
  const [ visiblePermission, setVisiblePermissions  ] = useState(false);

  const { 
    loadingListUsers,
    listUsers,
    showFormUser,
    userSelected,
    loadingDeleteUser,
    loadingCreateUser,
    loadingUpdateUser
  } = useSelector(state => state.get("users"));

  const { loadingListRols, listRols } = useSelector(state => state.get("rols"));
  
  const dispatch = useDispatch();

  const permAdd = usePermission("configurations.users.add");
  const permEdit = usePermission("configurations.users.edit");
  const permDelete = usePermission("configurations.users.delete");

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

  //TODO: GET DATA ROL WITH PERMISSION BY idRol
  const handleGetRolById = (nIdRol) => {
    const permission = listRols?.filter(r => r.nIdRol === nIdRol)[0];
    setPermissions(permission);
    setVisiblePermissions(true);
  }

  const handleCancel = () => {
    setPermissions(null);
    setVisiblePermissions(false);
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
        width: 30,
        align: "center",
        render: (value) => value ? value : "-"
    },
    {
        key: "sRol",
        dataIndex: "sRol",
        title: "Rol",
        width: 20,
        align: "center",
        render: (value) => <Tag color="blue">{value}</Tag>
    },
    {
        key: "nIdRol",
        dataIndex: "nIdRol",
        title: "Permisos",
        width: 20,
        align: "center",
        render: (value) => <Tooltip title="Ver permisos asignados"><UnlockOutlined onClick={() => handleGetRolById(value)}/></Tooltip>
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 10,
        align: "center",
        render: (_, user) => (
            <PIconEditDelete  
                permissionEdit={permEdit}
                permissionDelete={permDelete}
                handleClickEdit={() => handleEditUser(user)} 
                handleClickDelete={() => handleDeleteUser(user)}
                spinningEdit={loadingUpdateUser}
                spinningDelete={loadingDeleteUser}
            />
        )
    }
  ]
  
  //TODO: INIT - GET ALL USERS
  useEffect(() => {
    dispatch(rxGetUsers());
    dispatch(rxGetRols());
    // eslint-disable-next-line
  }, [loadingDeleteUser, loadingCreateUser, loadingUpdateUser])

  return (
    <Permissions permission='configurations.users'>
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
                    <PButton
                        permission={permAdd}
                        handleClick={handleViewFormUser}
                        loading={loadingCreateUser}
                        icon={<PlusOutlined className='mt-1 mr-2' />}
                        text="Agregar usuario"
                    />
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
                    scroll={{x: "80vw", y: "65vh"}}
                    onRow={(user) => ({
                        onClick: () => {
                            dispatch(rxUserSelected(user))
                        },
                        onDoubleClick: () => {
                            if(permEdit){
                                handleEditUser(user)
                            }
                        }
                    })}
                />
                </Card>
                { 
                    showFormUser && 
                    <FormUser />
                }
                <Modal
                    title={
                        <div className='flex justify-start'>
                            <UnlockOutlined className='mt-1 mr-2'/>
                            <p>Rol y Permiso</p>
                        </div>
                    }
                    visible={visiblePermission}
                    bodyStyle={{ padding: 10 }}
                    width="350px"
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose
                    loading={loadingListRols}
                >
                    <Alert message={permissions?.sRol?? ""} type="info" className='mb-2'/>
                    <Tree
                        defaultExpandAll
                        checkable
                        checkedKeys={permissions?.sPermissions? JSON.parse(permissions?.sPermissions): []}
                        treeData={rols}
                        showIcon
                        checkStrictly
                        blockNode
                    />
                </Modal>
        </>
    </Permissions>
  )
}

export default Users;