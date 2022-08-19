export const rolesDefault = {
    cliente: [
        'menu', 
        'menu.request-waiter', 
        'menu.request-payment', 
        'menu.init-service'
    ],

    administrador: [
        'menu', 
        'menu.request-payment', 
        'menu.request-waiter', 
        'menu.init-service', 
        'orders', 
        'orders.attend-order', 
        'dishes', 
        'dishes.active',
        'dishes.add', 
        'dishes.edit', 
        'dishes.delete', 
        'reports', 
        'reports.time-orders', 
        'reports.time-orders.export-excel', 
        'reports.rates', 
        'reports.rates.export-excel', 
        'reports.sales', 
        'reports.sales.export-excel', 
        'configurations', 
        'configurations.branchoffices', 
        'configurations.branchoffices.add', 
        'configurations.branchoffices.edit', 
        'configurations.branchoffices.delete', 
        'configurations.rols', 
        'configurations.rols.add', 
        'configurations.rols.edit', 
        'configurations.rols.delete', 
        'configurations.users', 
        'configurations.users.add', 
        'configurations.users.edit', 
        'configurations.users.delete', 
        'configurations.types-products', 
        'configurations.types-products.add', 
        'configurations.types-products.edit', 
        'configurations.types-products.delete'
    ],

    mozo: [
        'menu', 
        'menu.request-waiter', 
        'menu.init-service', 
        'orders', 
        'orders.attend-order',
        'dishes', 
        'dishes.active'
    ],

    chef: [
        'orders'
    ]
}