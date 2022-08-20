import { DeleteOutlined, DeleteTwoTone, EditOutlined, EditTwoTone } from '@ant-design/icons';
import { Tooltip, Spin } from 'antd';

const PIconEditDelete = (props) => {
  const {
    permissionEdit = false, 
    permissionDelete = false, 
    handleClickEdit = null, 
    handleClickDelete = null, 
    spinningEdit = false, 
    spinningDelete = false
  } = props;

  return (
    <div className='flex justify-around'>
      {
          permissionEdit ? 
            <Tooltip title="Editar">
                <Spin spinning={spinningEdit}>
                  <EditTwoTone onClick={handleClickEdit}/>
                </Spin>
            </Tooltip> :
            <Tooltip title={<p className='text-black font-semibold'>Necesitas permiso para ejecutar esta acción!</p>} 
              color="#F7F6DC" 
              placement="left"
            >
              <Spin spinning={false}>
                <EditOutlined className='text-gray-500 hover:cursor-not-allowed'/>
              </Spin>
            </Tooltip>
      }
      {
          permissionDelete ?
          <Tooltip title="Eliminar">
            <Spin spinning={spinningDelete}>
              <DeleteTwoTone twoToneColor="#ed4956" onClick={handleClickDelete} />
            </Spin>
          </Tooltip> : 
          <Tooltip title={<p className='text-black font-semibold'>Necesitas permiso para ejecutar esta acción!</p>} 
            color="#F7F6DC" 
            placement="left"
          >
            <Spin spinning={false}>
              <DeleteOutlined className='text-gray-500 hover:cursor-not-allowed' />
            </Spin>
          </Tooltip>
      }
    </div>
  )
}

export default PIconEditDelete;