import { Link } from 'react-router-dom';
import { 
    BarChartOutlined, 
    BorderOutlined, 
    DollarCircleOutlined, 
    FieldTimeOutlined, 
    ProfileOutlined, 
    SettingOutlined, 
    ShopOutlined, 
    SnippetsOutlined, 
    StarOutlined, 
    TagsOutlined, 
    UserOutlined 
} from "@ant-design/icons";

export const routes = [
    {
        key: "1",
        icon: <SnippetsOutlined className="mr-2"/>,
        label: <Link to="/menu">Menu</Link>,
    },
    {
        key: "2",
        icon: <ProfileOutlined className='mr-2' />,
        label: <Link to="/orders">Pedidos</Link>,
    },
    {
        key: "3",
        icon: <BorderOutlined className='mr-2' />,
        label: <Link to="/dishes">Platos</Link>,
    },
    {
        key: "4",
        icon: <BarChartOutlined className='mr-2'/>,
        label: "Reporte",
        children: [
            {
                key: "4.1",
                icon: <DollarCircleOutlined className='mr-2'/>,
                label: <Link to="/reports/sales">Ventas</Link>,
            },
            {
                key: "4.2",
                icon: <FieldTimeOutlined className='mr-2'/>,
                label: <Link to="/reports/time-orders">Tiempo Pedidos</Link>,

            },
            {
                key: "4.3",
                icon: <StarOutlined className='mr-2'/>,
                label: <Link to="/reports/rates">Puntuaciones</Link>,

            },
        ]
    },
    {
        key: "5",
        icon: <SettingOutlined className='mr-2'/>,
        label: "Configuración",
        children: [
            {
                key: "5.1",
                icon: <TagsOutlined className='mr-2'/>,
                label: <Link to="/configuration/types-products">Tipos de productos</Link>,
            },
            {
                key: "5.2",
                icon: <UserOutlined className='mr-2'/>,
                label: <Link to="/configuration/users">Usuarios</Link>,

            },
            {
                key: "5.3",
                icon: <ShopOutlined className='mr-2'/>,
                label: <Link to="/configuration/branch-offices">Sucursales</Link>,
            },
        ]
    }
]