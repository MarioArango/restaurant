import { Avatar, Breadcrumb, Button, Dropdown, Layout, Mentions, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, clearAuth } from '../../Storage';
const { Header, Content, Footer } = Layout;

const LayoutApp = ({children}) => {
  const auth = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login")
  }

  const menu = (
    <Mentions
      items={[
        {
          key: '1',
          label: <Button className='bg-primary' type='primary' onClick={handleLogout}>Cerrar sesión</Button>
        }
      ]}
    />
  );

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
              label: "Panel",
              onClick: () => {navigate('/home')}
            },
            {
              key: "2",
              label: "Pedidos",
              onClick: () => {navigate('/orders')}
            },
            {
              key: "3",
              label: "Platos registrado",
              onClick: () => {navigate('/dishes')}
            },
            {
              key: "4",
              label: "Usuarios",
              onClick: () => {navigate('/users')}
            },
            {
              key: "5",
              label: "Reporte de ventas",
              onClick: () => {navigate('/report-sales')}
            },
            {
              key: "6",
              label: "Cerrar sesión",
              onClick: () => {handleLogout()}
            }
          ]}
        />
      </Header>
      <Content
        style={{
          padding: '0 15px',
        }}
      >
        { children }
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