import { Layout } from 'antd';
import { useAuth } from '../../Hooks/auth';
import FooterLayout from './FooterLayout';
import HeaderNav from './HeaderNav';
import SidebarLayout from './SidebarLayout';

const { Content } = Layout;

const LayoutApp = ({children}) => {
  const { sRol } = useAuth();

  return (
    <Layout>
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
          <div className='overflow-y-auto'>
            { children }
          </div>
        </Content>
        <FooterLayout/>
      </Layout>
    </Layout>
  )
}

export default LayoutApp;