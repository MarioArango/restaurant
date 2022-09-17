import { Button, Tooltip } from 'antd';

const PButton = ({permission, handleClick, loading, icon, text, disabled = false }) => {
  return (
    <div>
        {
            permission ? 
            <Button
                type="primary"
                onClick={handleClick}
                loading={loading}
                disabled={disabled}
            >
                <div className='flex justify-between'>
                    {icon}
                    <p>{text}</p>
                </div>
            </Button> :
            <Tooltip title={<p className='text-black font-semibold'>Necesitas permiso para ejecutar esta acción!</p>} 
                color="#F7F6DC" 
                placement="left"
             >
                <Button
                    type="primary"
                    disabled
                >
                    <div className='flex justify-between'>
                        {icon}
                        <p>{text}</p>
                    </div>
                </Button>
            </Tooltip>
        }
        
    </div>
  )
}

export default PButton;