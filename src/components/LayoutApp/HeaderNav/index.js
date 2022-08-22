import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Layout, Modal } from 'antd';
import { PlayCircleOutlined, PoweroffOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { clearAuth } from '../../../Hooks/auth';
import RequestWaiter from './RequestWaiter';
import { rxClearAllInitService, rxShowInitService, rxShowTypeService } from '../../../appRedux/actions';
import { usePermission } from '../../../Hooks/usePermission';
import PButton from '../../PButton';

const { Header } = Layout;

const HeaderNav = () => {

  const navigate = useNavigate();
  //TODO: REDUX STATE
  const { typeService,  numberTable } = useSelector(state => state.get("users"));
  const { initService } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch();
  const permInitService = usePermission("menu.init-service");

  //TODO: CLEAR AUTH AND GOT TO LOGIN
  const handleLogout = () => {
    Modal.confirm({
      centered: true,
      title: "Mensaje de Confirmación",
      content: <p>¿Esta seguro de cerrar sesión?</p>,
      okText: "Sí",
      cancelText: "Cancelar",
      cancelButtonProps: { type: "text" },
      onOk: () => {
        clearAuth();
        localStorage.removeItem("authSucursal");
        localStorage.removeItem("authPermissions");
        dispatch(rxClearAllInitService())
        navigate("/login")
        window.location.reload();
      },
      onCancel: () => { }
    })
  }

  const handleShowTypeService = () => {
    if(permInitService){
      dispatch(rxShowTypeService(true))
    }
  }

  const handleShowInitService = () => {
    dispatch(rxShowInitService(true))
  }

  return (
    <Header className='flex justify-between overflow-auto'>
          <div className='mr-2 hover:cursor-pointer' onClick={handleShowTypeService}>
            <Avatar style={{backgroundColor: "white", verticalAlign: 'middle'}} size="large" gap={1}>
                <span className='text-black font-medium'>
                {typeof(typeService) === "string" ? typeService.toUpperCase():""}
                {typeof(typeService) === "string" && typeService === "mesa"? numberTable: ""}
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
                    <p className="mr-1">{initService[0].nNumberDiners}</p>
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
    </Header>
  )
}

export default memo(HeaderNav);