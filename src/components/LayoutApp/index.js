import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Layout, Menu, Select } from 'antd';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth, clearAuth } from '../../Hooks/auth';
import { rxSetUserAuthSucursal } from '../../appRedux/actions';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const LayoutApp = ({children}) => {
  //TODO: REDUX STATE
  const { authSucursal, loadingLoginUser } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const auth = useAuth();
  
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
              onClick: () => { handleLogout() }
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
                  auth.sBranchOfficesAssigned?.map((boa, index) => (
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