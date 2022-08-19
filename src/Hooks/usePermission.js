import { useSelector } from 'react-redux';


export const usePermission = (permission) => {
    const { authPermissions } = useSelector(state => state.get("users"));
    const verify = authPermissions && authPermissions[0]?.sPermissions.includes(permission);
    return verify
}