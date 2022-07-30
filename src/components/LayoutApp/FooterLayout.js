import { useDispatch, useSelector } from 'react-redux';
import { Select, Layout } from 'antd';
import { useAuth } from '../../Hooks/auth';
import { rxSetUserAuthSucursal } from '../../appRedux/actions';

const { Footer } = Layout;
const { Option } = Select;

const FooterLayout = () => {
  //TODO: REDUX STATE
  const { authSucursal, loadingLoginUser } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: GET AUTH LOCAL STORAGE
  const { sBranchOfficesAssigned } = useAuth();

  const handleSelectBrachOffice = (_, option) => {
    dispatch(rxSetUserAuthSucursal(option.data));
  }
  
  return (
    <Footer
        style={{
          textAlign: 'center',
          paddingBlock: "10px",
          paddingInline: "20px",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%"
        }}
        className="bg-gray-300"
      >
        <div className='flex justify-between items-center'>
          <div>
            {authSucursal && 
              <Select
                value={authSucursal.nIdBranchOffice}
                loading={loadingLoginUser}
                style={{width: 200}}
                onSelect={handleSelectBrachOffice}
              >
                {
                  sBranchOfficesAssigned?.map((boa, index) => (
                    <Option key={index} value={boa.nIdBranchOffice} data={boa}>
                      {boa.sBranchOffice}
                    </Option>
                  ))
                }              
              </Select>
            }
          </div>
          <div>
            <p className='font-medium'>Restaurante @Copyright</p>
          </div>
        </div>
    </Footer>
  )
}

export default FooterLayout;