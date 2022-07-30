import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Modal} from 'antd';
import { useAuth, clearAuth } from '../../Hooks/auth';
import { rxGetRequestWaiters } from '../../appRedux/actions';
import FooterLayout from './FooterLayout';
import HeaderNav from './HeaderNav';

const { Content } = Layout;

const LayoutApp = ({children}) => {
  //TODO: REDUX STATE
  const { 
    authSucursal, typeService } = useSelector(state => state.get("users"));


  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const { sRol } = useAuth();

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

  //TODO: INIT - GET ALL REQUEST WAITERS
  useEffect(() => {
    if((sRol === "mozo" || sRol === "administrador") && typeService === "mesa"){
        if(authSucursal && typeService){
            let unsub;
            dispatch(rxGetRequestWaiters(authSucursal.nIdBranchOffice, (us) => {
                unsub = us
            }))  
            return () => {
                console.log('unsub waiter')
                unsub()
            }
        } 
    }
  // eslint-disable-next-line
  }, [authSucursal?.nIdBranchOffice, typeService])
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