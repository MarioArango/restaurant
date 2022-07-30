import { 
    BarChartOutlined, 
    BorderOutlined, 
    DollarCircleOutlined, 
    ProfileOutlined, 
    SettingOutlined, 
    ShopOutlined, 
    SnippetsOutlined, 
    TagsOutlined, 
    UserOutlined 
} from "@ant-design/icons";

export const routes = [
    {
        key: "1",
        to: "/",
        icon: <SnippetsOutlined className="mr-2"/>,
        name: "Menu",
    },
    {
        key: "2",
        to: "/orders",
        icon: <ProfileOutlined className='mr-2' />,
        name: "Pedidos",
    },
    {
        key: "3",
        to: "/dishes",
        icon: <BorderOutlined className='mr-2' />,
        name: "Platos",
    },
    {
        key: "4",
        icon: <BarChartOutlined className='mr-2'/>,
        name: "Reporte",
        children: [
            {
                key: "4.1",
                to: "/sales",
                icon: <DollarCircleOutlined className='mr-2'/>,
                name: "Ventas",
            }
        ]
    },
    {
        key: "5",
        icon: <SettingOutlined className='mr-2'/>,
        name: "Configuración",
        children: [
            {
                key: "5.1",
                to: "/types-products",
                icon: <TagsOutlined className='mr-2'/>,
                name: "Tipos de productos"
            },
            {
                key: "5.2",
                to: "/users",
                icon: <UserOutlined className='mr-2'/>,
                name: "Usuarios"
            },
            {
                key: "5.3",
                to: "/branch-offices",
                icon: <ShopOutlined className='mr-2'/>,
                name: "Sucursales"
            },
        ]
    }
]