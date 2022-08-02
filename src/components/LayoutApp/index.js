import { Layout } from 'antd';
import { memo } from 'react';
import { useAuth } from '../../Hooks/auth';
import FooterLayout from './FooterLayout';
import HeaderNav from './HeaderNav';
import SidebarLayout from './SidebarLayout';

const { Content } = Layout;

const LayoutApp = ({children}) => {
  const { sRol } = useAuth();

  return (
    <Layout className=''>
      {
        sRol !== "cliente" &&
        <SidebarLayout/>
      }
      <Layout>
        <HeaderNav/>
          <Content
            style={{
              padding: '0 15px'
            }}
          >
            <div className=''>
              { children }
            </div>
          </Content>
          {
            sRol !== "cliente" &&
            <FooterLayout/>
          }
      </Layout>
    </Layout>
  )
}

export default memo(LayoutApp);