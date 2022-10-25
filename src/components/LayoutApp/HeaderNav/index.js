import { memo, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Layout, Modal } from 'antd';
import { PlayCircleOutlined, PoweroffOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { clearAuth } from '../../../Hooks/auth';
import RequestWaiter from './RequestWaiter';
import { usePermission } from '../../../Hooks/usePermission';
import PButton from '../../PButton';
import VerifyUser from './VerifyUser';
import { rxClearAllInitService, rxShowInitService, rxShowTypeService, rxClearInitAccount, rxShowVerifyUser } from '../../../appRedux/actions';

const { Header } = Layout;

const HeaderNav = () => {

  //TODO: NAVIGATION
  const navigate = useNavigate();

  //TODO: REDUX STATE
  const { numberTable, verifyUser, showVerifyUser } = useSelector(state => state.get("users"));
  const { initService } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch();

  //TODO: PERMISSION
  const permInitService = usePermission("menu.init-service");
  const permInitNumberTable = usePermission("menu.init-number-table");

  //TODO: CLEAR AUTH AND GOT TO LOGIN
  const handleLogout = () => {
    dispatch(rxShowVerifyUser(true))
  }

  const handleShowTypeService = () => {
    if(permInitNumberTable){
      dispatch(rxShowTypeService(true))
    }
  }

  const handleShowInitService = () => {
    dispatch(rxShowInitService(true))
  }
  
  useEffect(() => {
    if(verifyUser){
      dispatch(rxShowVerifyUser(false))
      Modal.confirm({
        centered: true,
        title: "Mensaje de Confirmación",
        content: <p>¿Esta seguro de cerrar sesión?</p>,
        okText: "Sí",
        cancelText: "Cancelar",
        cancelButtonProps: { type: "text" },
        onOk: () => {
          clearAuth();
          dispatch(rxClearAllInitService())
          dispatch(rxClearInitAccount())
          navigate("/login")
          window.location.reload();
        },
        onCancel: () => { }
      })
    }else {
      dispatch(rxShowVerifyUser(false))
    }
    // eslint-disable-next-line
  }, [verifyUser])

  return (
    <Header className='flex justify-between overflow-auto'>
          <div className='mr-2 hover:cursor-pointer' onClick={handleShowTypeService}>
            <Avatar style={{backgroundColor: "white", verticalAlign: 'middle'}} size="large" gap={1}>
                <span className='text-black font-medium'>
                MESA {numberTable}
                </span>
            </Avatar>
          </div>
          {
            permInitService && 
            <PButton
              permission={permInitService}
              handleClick={handleShowInitService}
              loading={false}
              icon={<PlayCircleOutlined className='mt-1 mr-2' />}
              text="Iniciar"
            />
          }
          <div>
            {
              initService?.length > 0 && (
                <Button shape='circle' className='hover:cursor-default m-2' disabled>
                  <div className='flex justify-center items-center text-black'>
                    <p className="mr-1 font-bold">{initService[0].nNumberDiners}</p>
                    <UserSwitchOutlined />
                  </div>
                </Button>
              )
            }
          </div>
          <RequestWaiter/>
          <div onClick={handleLogout} className="hover:cursor-pointer text-white justify-self-end">
            <div className='flex justify-center items-center'>
              <PoweroffOutlined className='mr-2'/>
              <p>Salir</p>
            </div>
          </div>
          { showVerifyUser && <VerifyUser/> }
    </Header>
  )
}

export default memo(HeaderNav);