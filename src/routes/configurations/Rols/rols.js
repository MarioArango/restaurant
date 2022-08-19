export const rols = [
    {
      title: 'Menu',
      key: 'menu',
      children: [
        {
          title: 'Pedir cuenta',
          key: 'menu.request-payment',
        },
        {
          title: 'Solicitar mozo',
          key: 'menu.request-waiter',
        },
        {
          title: 'Iniciar servicio',
          key: 'menu.init-service',
        }
      ]
    },
    {
        title: 'Pedidos',
        key: 'orders',
        children: [
          {
            title: 'Atender orden',
            key: 'orders.attend-order',
          },
        ]
    },
    {
        title: 'Platos',
        key: 'dishes',
        children: [
          {
            title: 'Activar/Desactivar',
            key: 'dishes.active',
          },
          {
            title: 'Agregar',
            key: 'dishes.add',
          },
          {
            title: 'Editar',
            key: 'dishes.edit',
          },
          {
            title: 'Eliminar',
            key: 'dishes.delete',
          },
        ],
    },
    {
        title: 'Reportes',
        key: 'reports',
        children: [
          {
            title: 'Tiempo Pedidos',
            key: 'reports.time-orders',
            children: [
                {
                    title: "Excel",
                    key: "reports.time-orders.export-excel"
                }
            ]
          },
          {
            title: 'Puntuaciones',
            key: 'reports.rates',
            children: [
                {
                    title: "Excel",
                    key: "reports.rates.export-excel"
                }
            ]
          },
          {
            title: 'Ventas',
            key: 'reports.sales',
            children: [
                {
                    title: "Excel",
                    key: "reports.sales.export-excel"
                }
            ]
          },
        ],
    },
    {
        title: 'Configuración',
        key: 'configurations',
        children: [
          {
            title: 'Sucursales',
            key: 'configurations.branchoffices',
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.branchoffices.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.branchoffices.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.branchoffices.delete',
                },
              ]
          },
          {
            title: 'Roles',
            key: 'configurations.rols',
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.rols.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.rols.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.rols.delete',
                },
              ],
          },
          {
            title: 'Usuarios',
            key: 'configurations.users',
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.users.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.users.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.users.delete',
                },
              ],
          },
          {
            title: "Tipo de productos",
            key: "configurations.types-products",
            children: [
                {
                  title: 'Agregar',
                  key: 'configurations.types-products.add',
                },
                {
                  title: 'Editar',
                  key: 'configurations.types-products.edit',
                },
                {
                  title: 'Eliminar',
                  key: 'configurations.types-products.delete',
                },
              ],
          }
        ],
    },
  ]