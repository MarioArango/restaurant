import { Navigate } from 'react-router-dom'

const RestrictedComponent = ({ children, permission }) => {
  return (
    <>
      {
          permission.login ? children : <Navigate to="/login" replace={true}/>
      }
    </>
  )
}

export default RestrictedComponent