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
        sRol !== "Cliente" &&
        <SidebarLayout/>
      }
      <Layout>
        <HeaderNav/>
          <Content
            style={{
              padding: '0 15px'
            }}
          >
            <div className='mt-2'>
              { children }
            </div>
          </Content>
          {
            sRol !== "Cliente" &&
            <FooterLayout/>
          }
      </Layout>
    </Layout>
  )
}

export default memo(LayoutApp);