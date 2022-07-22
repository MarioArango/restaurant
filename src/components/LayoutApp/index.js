import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Select } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth, clearAuth } from '../../Hooks/auth';
import { rxGetRequestWaiters, rxSetUserAuthSucursal, rxShowTypeService } from '../../appRedux/actions';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const LayoutApp = ({children}) => {
  //TODO: REDUX STATE
  const { 
    authSucursal, 
    loadingLoginUser, 
    showTypesService, 
    typeService, 
    numberTable, 
    loadingListRequestWaiter, 
    listRequestWaiter
  } = useSelector(state => state.get("users"));


  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const { sBranchOfficesAssigned, sRol } = useAuth();
  
  //TODO: REDIRECT
  const navigate = useNavigate();

  //TODO: CLEAR AUTH AND GOT TO LOGIN
  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("authSucursal");
    navigate("/login")
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
  console.log(listRequestWaiter, "listRequestWaiter")
  return (
    <Layout className="layout flex-col">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: "0",
              label:  <Avatar
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
                        </Avatar>,
              onClick: () => { dispatch(rxShowTypeService(true)) }
            },
            {
              key: "1",
              label: <Link to="/">Menu</Link>,
            },
            {
              key: "2",
              label: <Link to="/orders">Pedidos</Link>
            },
            {
              key: "3",
              label: <Link to="/dishes">Platos</Link>
            },
            {
              key: "4",
              label: <Link to="/sales">Ventas</Link>
            },
            {
              key: "5",
              label: <Link to="/users">Usuarios</Link>
            },
            {
              key: "6",
              label: <Link to="/branch-offices">Sucursales</Link>
            },
            {
              key: "7",
              label: "Cerrar sesión",
              onClick: {handleLogout}
            },
            {
              key: "8",
              label: <div className='flex-col justify-center items-center'>
                        {
                          sRol === "mozo" || sRol === "administrador" && 
                          <Badge size="small" count={listRequestWaiter?.length}>
                            <Dropdown 
                              overlay={
                                <Menu
                                  items={
                                    listRequestWaiter.length > 0 
                                    ? listRequestWaiter?.map((rw, index) => ({key: index, label: "Mesa " + rw.sNumberTable})) 
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
            }
          ]}
        />
      </Header>
      <Content
        style={{
          padding: '0 15px',
          overflow: "auto"
        }}
      >
        <div>
            { children }
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          paddingBlock: "10px",
          paddingInline: "20px"
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