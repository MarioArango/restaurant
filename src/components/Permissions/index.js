import { useSelector } from 'react-redux';
import { Result } from "antd";

const Permissions = ({children, permission = "without-permission"}) => {
  const { authPermissions } = useSelector(state => state.get("users"));
  
  return (
    <div  className='min-h-screen'>
        {
            authPermissions && authPermissions[0]?.sPermissions.includes(permission)
            ? <div>{children}</div>
            : <Result
                status="403"
                title="403"
                subTitle="Lo sentimos, no está autorizado para acceder a esta página."
            />
        }
    </div>
  )
}

export default Permissions;