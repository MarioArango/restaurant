import RestrictedComponent from "../../components/RestrictedComponent"
import { useAuth } from "../../context/AuthContext"
import ListUsers from "./ListUsers";

const Users = () => {
  const auth = useAuth();

  return (
    <RestrictedComponent permission={auth}>
      <ListUsers/>
    </RestrictedComponent>
  )
}

export default Users