import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Modal, Select, Tag } from 'antd';
import { BarChartOutlined, BellOutlined, BorderOutlined, DollarCircleOutlined, PoweroffOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth, clearAuth } from '../../Hooks/auth';
import { rxGetRequestWaiters, rxSetUserAuthSucursal, rxShowTypeService } from '../../appRedux/actions';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const LayoutApp = ({children}) => {
  //TODO: REDUX STATE
  const { 
    authSucursal, 
    loadingLoginUser,
    typeService, 
    numberTable, 
    loadingListRequestWaiter, 
    listRequestWaiter
  } = useSelector(state => state.get("users"));


  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const { sBranchOfficesAssigned, sRol } = useAuth();

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
        window.location.reload();
      },
      onCancel: () => { }
    })
  }

  const handleSelectBrachOffice = (_, option) => {
    dispatch(rxSetUserAuthSucursal(option.data));
  }

  //TODO: INIT - GET ALL REQUEST WAITERS
  useEffect(() => {
    if((sRol === "mozo" || sRol === "administrador") && typeService === "mesa"){
        if(authSucursal && typeService){
            let unsub;
            dispatch(rxGetRequestWaiters(authSucursal.nIdBranchOffice, (us) => {
                unsub = us
            }))  
            return () => {
                console.log('unsub waiter')
                unsub()
            }
        } 
    }
  // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice, typeService])
  
  return (
    <Layout className="flex-col">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" onClick={() => { dispatch(rxShowTypeService(true)) }} >
            <Avatar
                style={{
                  backgroundColor: "white",
                  verticalAlign: 'middle',
                }}
                size="large"
                gap={1}
                
              >
                <span className='text-black font-medium'>
                  {typeof(typeService) === "string" ? typeService[0].toUpperCase():""}{typeof(typeService) === "string" && typeService === "mesa"? numberTable: ""}
                </span>
              </Avatar>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/">Menu</Link>
          </Menu.Item>
          <Menu.Item key="3">
          <Link to="/orders">
            <div className='flex justify-start items-center'>
              <ProfileOutlined className='mr-2' />
              <p>Pedidos</p>
            </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/dishes">
              <div className='flex justify-start items-center'>
                <BorderOutlined className='mr-2' />
                <p>Platos</p>
              </div>
            </Link>
          </Menu.Item>
          <Menu.SubMenu 
            key="5" 
            title={
              <div className='flex justify-start items-center'>
                <BarChartOutlined className='mr-2'/>
                <p>Reporte</p>
              </div>
            }>
                <Menu.Item>
                    <Link to="/sales">
                      <div className='flex justify-start items-center'>
                        <DollarCircleOutlined className='mr-2'/>
                        <p>Ventas</p>
                      </div>
                    </Link>
                </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="6" 
            title={
              <div className='flex justify-start items-center'>
                <SettingOutlined className='mr-2'/>
                <p>Configuración</p>
              </div>
            }>
                <Menu.Item key="6.1" >
                  <Link to="/types-products">
                    <div className='flex justify-start items-center'>
                      <TagsOutlined className='mr-2'/>
                      <p>Tipos de producto</p>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6.2" >
                  <Link to="/users">
                    <div className='flex justify-start items-center'>
                      <UserOutlined className='mr-2'/>
                      <p>Usuarios</p>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6.3">
                  <Link to="/branch-offices">
                    <div className='flex justify-start items-center'>
                      <ShopOutlined className='mr-2'/>
                      <p>Sucursales</p>
                    </div>
                  </Link>
                </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="7">
            <div className='flex-col justify-center items-center'>
              {
                (sRol === "mozo" || sRol === "administrador") && 
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
              }
            </div>
          </Menu.Item>
          <Menu.Item onClick={handleLogout}>
            <div className='flex justify-center items-center'>
              <PoweroffOutlined className='mr-2'/>
              <p>Cerrar Sesión</p>
            </div>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 15px'
        }}
      >
        <div className='overflow-y-auto'>
          { children }
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          paddingBlock: "10px",
          paddingInline: "20px",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%"
        }}
        className="bg-gray-300"
      >
        <div className='flex justify-between items-center'>
          <div>
            {authSucursal && 
              <Select
                value={authSucursal.nIdBranchOffice}
                loading={loadingLoginUser}
                style={{width: 200}}
                onSelect={handleSelectBrachOffice}
              >
                {
                  sBranchOfficesAssigned?.map((boa, index) => (
                    <Option key={index} value={boa.nIdBranchOffice} data={boa}>
                      {boa.sBranchOffice}
                    </Option>
                  ))
                }              
              </Select>
            }
          </div>
          <div>
            <p className='font-medium'>Restaurante @Copyright</p>
          </div>
        </div>
      </Footer>
    </Layout>
  )
}

export default LayoutApp;