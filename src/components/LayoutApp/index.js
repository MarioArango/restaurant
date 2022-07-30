import { Layout } from 'antd';
import FooterLayout from './FooterLayout';
import HeaderNav from './HeaderNav';

const { Content } = Layout;

const LayoutApp = ({children}) => {
  console.log("layout")
  return (
    <Layout className="flex-col">
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
  )
}

export default LayoutApp;