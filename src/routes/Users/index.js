import { useState, useEffect } from 'react';
import { Button, Table, Card, Tooltip, Modal, Spin } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { cardProps, customScroll, tableProps } from '../../util/config';
import FormUser from './FormUser';
import { rxDeleteUser, rxGetUsers } from '../../appRedux/actions';

const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [ view, setView ] = useState(false);
  const [ userSelected, setUserSelected ] = useState(null);
  const [ loadingDelete, setLoadingDelete ] = useState(false);
  const [loadingCreateUser, setLoadingCreateUser] = useState(false)

  const handleViewFormUser = () => {
    setView(true)
  }

    //TODO: GET ALL DISHES 
    const getUsers = () => {
        rxGetUsers((querySnapshot) => {
            const users = []
            querySnapshot.forEach(doc => {
                users.push({...doc.data(), nIdUser: doc.id}) 
            })
            setListUsers(users)
        })
      }
  //TODO: EDIT USER
  const handleEditUser = (user) => {
    setUserSelected(user)
    setView(true)
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
            setLoadingDelete(true)
            rxDeleteUser(user.nIdUser, () => {
            setLoadingDelete(false)
        })
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
        width: 20,
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
        width: 20,
        align: "center",
        render: (_, user) => (
            <div className='flex justify-around'>
                <Tooltip title="Editar">
                    <EditTwoTone onClick={() => handleEditUser(user)} />
                </Tooltip>
                <Tooltip title="Eliminar">
                    <Spin spinning={loadingDelete}>
                        <DeleteTwoTone twoToneColor="#ed4956" onClick={() => handleDeleteUser(user)} />
                    </Spin>
                </Tooltip>
            </div>
        )
    }
  ]
  
  //TODO: INIT - GET ALL USERS
  useEffect(() => {
    getUsers();
  }, [loadingDelete, loadingCreateUser])

  return (
    <>
        <Card
            {...cardProps}
            title="Lista de usuarios"
            extra={
                <Button
                    type="primary"
                    className='bg-primary'
                    icon={<PlusOutlined/>}
                    onClick={handleViewFormUser}
                >
                    Agregar usuario
                </Button>
            }
        >
            <Table
                {...tableProps}
                bordered
                columns={columns}
                loading={false}
                dataSource={listUsers}
                rowKey={(user) => user.nIdUser}
                rowClassName={(user) => user?.nIdUser === userSelected?.nIdUser ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                scroll={customScroll()}
                onRow={(user) => ({
                    onClick: () => {
                        setUserSelected(user)
                    },
                    onDoubleClick: () => {
                        handleViewFormUser()
                    }
                })}
            />
        </Card>
        { 
          view && 
          <FormUser 
            view={view}
            setView={setView} 
            userSelected={userSelected} 
            setUserSelected={setUserSelected}
            loadingCreateUser={loadingCreateUser}
            setLoadingCreateUser={setLoadingCreateUser}
          />
        }
    </>
  )
}

export default Users