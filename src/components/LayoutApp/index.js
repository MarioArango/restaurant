import { Avatar, Layout, Menu } from 'antd';
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth, clearAuth } from '../../Hooks/auth';
const { Header, Content, Footer } = Layout;

const LayoutApp = ({children}) => {
  //TODO: GET AUTH LOCAL STORAGE
  const auth = useAuth();
  
  //TODO: REDIRECT
  const navigate = useNavigate();

  //TODO: CLEAR AUTH AND GOT TO LOGIN
  const handleLogout = () => {
    clearAuth();
    navigate("/login")
  }

  return (
    <Layout className="layout">
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
              label: "Menu",
              label: <Link to="/">Menu</Link>,
            },
            {
              key: "2",
              label: <Link to="/orders">Pedidos</Link>
            },
            {
              key: "3",
              label: "Platos",
              label: <Link to="/dishes">Platos</Link>
            },
            {
              key: "4",
              label: <Link to="/users">Usuarios</Link>
            },
            {
              key: "5",
              label: <Link to="/users">Ventas</Link>
            },
            {
              key: "6",
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
        }}
        className="bg-gray-300"
      >
        <p className='font-medium'>Restaurante @Copyright</p>
      </Footer>
    </Layout>
  )
}

export default LayoutApp;