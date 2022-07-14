import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Hooks/auth'

const RestrictedComponent = ({ children }) => {
  const auth = useAuth();
  return (
    <>
      {
        auth?.isValidate ? children : <Navigate to="/login" replace={true}/>
      }
    </>
  )
}

export default RestrictedComponent