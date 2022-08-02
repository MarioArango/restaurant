import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Layout, Modal } from 'antd';
import { PlayCircleOutlined, PoweroffOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { clearAuth, useAuth } from '../../../Hooks/auth';
import RequestWaiter from './RequestWaiter';
import { rxClearAllInitService, rxShowInitService, rxShowTypeService } from '../../../appRedux/actions';

const { Header } = Layout;

const HeaderNav = () => {
  const { sRol } = useAuth();

  //TODO: REDUX STATE
  const { typeService,  numberTable } = useSelector(state => state.get("users"));
  const { initService } = useSelector(state => state.get("menu"));

  const dispatch = useDispatch();

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
        dispatch(rxClearAllInitService())
        window.location.reload();
      },
      onCancel: () => { }
    })
  }

  const handleShowTypeService = () => {
    if(sRol !== "cliente"){
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
          <div>
            {
              (sRol === "mozo" || sRol === "administrador") && (
                <Button 
                  type="dashed" 
                  onClick={handleShowInitService} 
                  className='mr-2 hover:cursor-pointer'
                >
                  <div className='flex justify-center text-white'>
                      <PlayCircleOutlined className='mt-1 mr-2'/>
                      Iniciar
                  </div>
                </Button>
              )
            }
          </div>
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