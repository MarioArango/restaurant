import { Result, Button } from "antd"
import { useHistory } from "react-router-dom"

const NotFound = () => {
  //TODO: HOOK INHERID ANT DESING  
  const history  = useHistory();

  //TODO: BACK TO HOME
  const handleBack = () => {
    history.push('/');
  }
  return (
    <Result
        status="404"
        title="404"
        subTitle="La página visitada no existe."
        extra={
        <Button 
            type="primary" 
            className="bg-primary"
            onClick={handleBack}
        >
            Regresar
        </Button>}
    />
  )
}

export default NotFound