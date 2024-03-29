import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Table, Card, Modal, Tag } from 'antd';
import { PlusOutlined, UnlockOutlined } from '@ant-design/icons';
import { cardProps, tableProps } from '../../../util/config';
import FormRol from './FormRol';
import { rxDeleteRol, rxGetRols, rxShowFormRol, rxRolSelected } from '../../../appRedux/actions';
import Permissions from '../../../components/Permissions';
import { usePermission } from '../../../Hooks/usePermission';
import PButton from '../../../components/PButton';
import PIconEditDelete from '../../../components/PIconEditDelete';
import withFilterTable from '../../../HOC/withFilterTable';

const Rols = (props) => {
  const { getColumnSearchProps } = props;  
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

  const permAdd = usePermission("configurations.rols.add");
  const permEdit = usePermission("configurations.rols.edit");
  const permDelete = usePermission("configurations.rols.delete");

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
        render: (value) => value ? <Tag color="blue">{value}</Tag> : "-",
        ...getColumnSearchProps('sRol')
    },
    {
        key: "",
        dataIndex: "",
        title: "",
        width: 5,
        align: "center",
        render: (_, rol) => (
            <PIconEditDelete
                permissionEdit={permEdit}
                permissionDelete={permDelete}
                handleClickEdit={() => handleEditRol(rol)} 
                handleClickDelete={() => handleDeleteRol(rol)}
                spinningEdit={loadingUpdateRol}
                spinningDelete={loadingDeleteRol}
            />
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
                        <UnlockOutlined className='mt-1 mr-2'/> 
                        <p>Roles Registrados</p>
                    </div>
                }
                extra={
                    <PButton
                        permission={permAdd}
                        handleClick={handleViewFormRol}
                        loading={loadingCreateRol}
                        icon={<PlusOutlined className='mt-1 mr-2' />}
                        text="Agregar Rol"
                    />
                }
            >
                <Table
                    {...tableProps}
                    bordered
                    columns={columns}
                    loading={loadingListRols}
                    dataSource={listRols}
                    rowKey={(rol) => rol?.nIdRol}
                    rowClassName={(rol) => rol?.nIdRol === rolSelected?.nIdRol ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                    scroll={{x: "80vw", y: "65vh"}}
                    onRow={(rol) => ({
                        onClick: () => {
                            dispatch(rxRolSelected(rol))
                        },
                        onDoubleClick: () => {
                            if(permEdit){
                                handleEditRol(rol)
                            }
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

export default withFilterTable(Rols);