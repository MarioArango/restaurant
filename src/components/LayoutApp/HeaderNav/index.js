import { memo, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Layout, Menu, Modal } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { clearAuth } from '../../../Hooks/auth';
import { routes } from '../routes';
import RequestWaiter from './RequestWaiter';

const { Header } = Layout;

const HeaderNav = () => {
  const [ menu, setMenu ] = useState([])
  //TODO: REDUX STATE
  const { typeService,  numberTable } = useSelector(state => state.get("users"));

  //TODO: CLEAR AUTH AND GOT TO LOGIN
  const handleLogout = () => {
    Modal.confirm({
      centered: true,
      title: "Mensaje de Confirmación",
      content: <p>¿Esta seguro de cerrar sesión?</p>,
      okText: "Sí",
      cancelText: "Cancelar",
      cancelButtonProps: { type: "text" },
      onOk: () => {
        clearAuth();
        localStorage.removeItem("authSucursal");
        window.location.reload();
      },
      onCancel: () => { }
    })
  }
 
  const headerNav = useCallback(() => {
    console.log('headerNav')
    const nav = routes.map(r => {
      if(Array.isArray(r.children)){
        return (
          <Menu.SubMenu 
            key={r.key} 
            title={
              <div className='flex justify-start items-center'>
                {r.icon}
                <p>{r.name}</p>
              </div>
            }
          >
            {
              r.children.map(c => (
                <Menu.Item key={c.key}>
                  <Link to={c.to}>
                    <div className='flex justify-start items-center'>
                      {c.icon}
                      <p>{c.name}</p>
                    </div>
                  </Link>
                </Menu.Item>
              ))
            }
          </Menu.SubMenu>
        )
      }else {
        return (
          <Menu.Item key={r.key}>
            <Link to={r.to}>
              <div className='flex justify-start items-center'>
                {r.icon}
                <p>{r.name}</p>
              </div>
            </Link>
          </Menu.Item>
        )
      }
    })
    return nav;
  }, [])

  useEffect(() => {
    const navList = headerNav();
    setMenu(navList)
    return () => {
      setMenu([])
    }
  }, [])

  console.log("header nav")
  return (
    <Header className='flex justify-between'>
      <div className='mr-2 hover:cursor-pointer'>
        <Avatar style={{backgroundColor: "white", verticalAlign: 'middle'}} size="large" gap={1}>
            <span className='text-black font-medium'>
            {typeof(typeService) === "string" ? typeService[0].toUpperCase():""}
            {typeof(typeService) === "string" && typeService === "mesa"? numberTable: ""}
            </span>
        </Avatar>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        {menu}
      </Menu>
      <Link to="/dishes">Platos</Link>
      <div onClick={handleLogout} className="hover:cursor-pointer text-white">
        <div className='flex justify-center items-center'>
          <PoweroffOutlined className='mr-2'/>
          <p>Salir</p>
        </div>
      </div>
    </Header>
  )
}

export default memo(HeaderNav);