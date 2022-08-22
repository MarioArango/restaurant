import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { rolesDefault } from '../../routes/configurations/Rols/rolesDefault';
import FooterLayout from './FooterLayout';
import HeaderNav from './HeaderNav';
import SidebarLayout from './SidebarLayout';

const { Content } = Layout;

const LayoutApp = ({children}) => {
  const [visibleComponent, setVisibleComponent] = useState(true);
  const { authPermissions } = useSelector(state => state.get("users"));

  //TODO: INIT
  useEffect(() => {
    const allPermissionUser = JSON.parse(authPermissions[0]?.sPermissions?? '[]');

    if(rolesDefault?.cliente?.length === allPermissionUser?.length){
      const isClient = allPermissionUser?.every(p => rolesDefault?.cliente?.includes(p));
      setVisibleComponent(!isClient);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout className=''>
      {
        visibleComponent &&
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
            visibleComponent &&
            <FooterLayout/>
          }
      </Layout>
    </Layout>
  )
}

export default memo(LayoutApp);