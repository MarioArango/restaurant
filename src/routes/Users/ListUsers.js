import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table, Card } from 'antd';
import { cardProps, customScroll, tableProps } from '../../util/config';
import FormUser from './FormUser';

const ListUsers = () => {
  const [ view, setView ] = useState(false);
  const [ userSelected, setUserSelected ] = useState(null);

  const handleViewFormUser = () => {
    setView(true)
  }

  const columns = [
    {
        key: "index",
        title: "#",
        width: 40,
        align: "center",
        render: (_, __, index) => index + 1,
    },
    {
        key: "sDescripcion",
        dataIndex: "sDescripcion",
        title: "Descripción",
        width: 150,
        align: "center",
        render: (value) => value ? value : "-"
    },
  ]

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
                dataSource={[]}
                rowKey={(user) => user.nIdUser}
                rowClassName={(user) => user?.nIdUser === userSelected?.nIdUser ? "gx-outline-record gx-pointer" : "gx-pointer"}
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
            setUserSelected={setUserSelected}/>
        }
    </>
  )
}

export default ListUsers