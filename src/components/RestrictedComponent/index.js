import { Navigate } from 'react-router-dom'

const RestrictedComponent = ({ children, auth }) => {
  return (
    <>
      {
        true ? children : <Navigate to="/login" replace={true}/>
      }
    </>
  )
}

export default RestrictedComponent