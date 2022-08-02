import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Dropdown, Menu, Tag } from 'antd';
import { BellOutlined} from '@ant-design/icons';
import { useAuth } from '../../../Hooks/auth';
import { rxGetRequestWaiters } from '../../../appRedux/actions';

const RequestWaiter = () => {
  //TODO: REDUX STATE
  const { 
    authSucursal, 
    typeService, 
    loadingListRequestWaiter, 
    listRequestWaiter
  } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const { sRol } = useAuth();

   //TODO: INIT - GET ALL REQUEST WAITERS
   useEffect(() => {
    if((sRol === "mozo" || sRol === "administrador") && typeService === "mesa"){
        if(authSucursal && typeService){
            let unsub;
            dispatch(rxGetRequestWaiters(authSucursal.nIdBranchOffice, (us) => {
                unsub = us
            }))  
            return () => {
                // console.log('unsub waiter')
                unsub()
            }
        } 
    }
  // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice, typeService])
  
  return (
    <>
        {
            (sRol === "mozo" || sRol === "administrador") && 
            <div className='flex-col justify-center items-center mr-2'>
                <Badge size="small" count={listRequestWaiter?.length}>
                    <Dropdown 
                    overlay={
                        <Menu
                        items={
                            listRequestWaiter.length > 0 
                            ? listRequestWaiter?.map((rw, index) => ({key: index, label:<div><Tag color="green" >Mesa {rw.sNumberTable}</Tag><Tag color="blue">{rw.dCreatedHour + ":" + rw.dCreatedMin + " h"}</Tag></div> })) 
                            : [{key:"1", label: "No hay solicitudes"}]}
                        />
                    } 
                    placement="bottom" 
                    className='bg-primary'
                    >
                    <Button 
                        className='bg-fondo' 
                        type='ghost' 
                        shape='circle' 
                        icon={<BellOutlined className='text-primary'/>}
                        loading={loadingListRequestWaiter}
                    />
                    </Dropdown>
                </Badge>
            </div>
        }
    </>
  )
}

export default memo(RequestWaiter);