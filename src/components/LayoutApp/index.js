import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const LayoutApp = ({children}) => {
  const navigate = useNavigate();

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
            key: "1",
            label: "Panel",
            onClick: () => {navigate('/')}
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
          }
        ]}
      />
    </Header>
    <Content
      style={{
        padding: '0 15px',
      }}
    >
      <div className="site-layout-content bg-fondo mt-2">
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