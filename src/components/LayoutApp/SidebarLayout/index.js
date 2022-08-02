import { memo, useState } from 'react';
import { Avatar, Badge, Layout, Menu } from 'antd';
import { routes } from '../SidebarLayout/routes';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../Hooks/auth';

const { Sider } = Layout;

const SidebarLayout = () => {
  const [ collapsed, setCollapsed ] = useState(true);
  const { sUsername } = useAuth();

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='flex-col mt-2'>
            <div className='flex justify-center items-center'>
                <Badge dot color="green">
                    <Avatar className='bg-fondo'  shape="square" icon={<UserOutlined className='text-primary'/>} />
                </Badge>
            </div>
            <div className='flex justify-center items-center text-white text-base'>{sUsername?.toUpperCase()?.substring(0,5)}</div>
        </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={routes}/>
    </Sider>
  )
}

export default memo(SidebarLayout);