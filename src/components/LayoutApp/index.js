import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Layout, Menu, Select } from 'antd';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth, clearAuth } from '../../Hooks/auth';
import { rxGetBranchOffices, rxSetUserAuthSucursal } from '../../appRedux/actions';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const LayoutApp = ({children}) => {
  //TODO: REDUX STATE
  const { 
    loadingListBranchOff,
    listBranchOffices
  } = useSelector(state => state.get("branchOffices"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const auth = useAuth();
  
  //TODO: REDIRECT
  const navigate = useNavigate();

  //TODO: CLEAR AUTH AND GOT TO LOGIN
  const handleLogout = () => {
    clearAuth();
    navigate("/login")
  }

  const handleSelectBrachOffice = (value) => {
    dispatch(rxSetUserAuthSucursal(value));
  }

  //TODO: INIT - GET ALL BRANCHOFFICES
  useEffect(() => {
    dispatch(rxGetBranchOffices());
    // eslint-disable-next-line
  }, [])

  return (
    <Layout className="layout flex-col">
      <Header>
        <div className="logo" />
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
                          <span className='text-black font-medium'>{auth.sUsername.substring(0, 1)?.toUpperCase()}</span>
                        </Avatar>
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
              label: <Link to="/users">Usuarios</Link>
            },
            {
              key: "5",
              label: <Link to="/sales">Ventas</Link>
            },
            {
              key: "6",
              label: <Link to="/branch-offices">Sucursales</Link>
            },
            {
              key: "7",
              label: "Cerrar sesión",
              onClick: () => { handleLogout() }
            }
          ]}
        />
      </Header>
      <Content
        style={{
          padding: '0 15px',
        }}
      >
        <div className='h-screen'>
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
            <Select
              value={authSucursal}
              loading={loadingListBranchOff}
              style={{width: 200}}
              onSelect={handleSelectBrachOffice}
            >
              {
                listBranchOffices.map((bo, index) => {
                  let verf = false;
                  auth.sBranchOfficesAssigned.forEach(boId => {
                    if(bo.nIdBranchOffice === boId){
                      verf = true;
                    }
                  })
                  if(verf){
                    return (
                      <Option key={index} value={bo.nIdBranchOffice}>
                        {bo.sBranchOffice}
                      </Option>
                    )
                  }else {
                    return null
                  }
                })
              }
            </Select>
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