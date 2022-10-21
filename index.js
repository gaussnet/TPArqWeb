const express = require('express')
const app = express()
const port = 3000

let clients = [
    {id: 34567890, nombre: 'Juan', apellido: 'Perez'},
    {id: 239432563, nombre: 'Cecilia', apellido: 'Martinez'},
    {id: 12547385, nombre: 'Luis', apellido: 'Gonzalez'},
    {id: 14538639, nombre: 'Sofia', apellido: 'Garcia'}
];

let cuentas = [
    {nroCuenta: 1245, tipo: 'ca', idCliente: 239432563, saldo: 234.47},
    {nroCuenta: 6789, tipo: 'cc', idCliente: 12547385, saldo: 3456.56},
    {nroCuenta: 5432, tipo: 'ca', idCliente: 34567890, saldo: 10459.34},
    {nroCuenta: 8756, tipo: 'cc', idCliente: 239432563, saldo: -234.89}
];

app.use(express.json());    //convierte el body de los request a json

app.use((request, response, next) => {
    console.log(request.method, request.path);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/clientes', (request, response) => {
    if(clients.length ===0) {
        response.status(404).end();
    } else {
        response.json(clients);
    }

});

app.get('/api/clientes/:id', (request, response) => {
    const clienteEnviar= clients.filter(cliente=> (cliente.id == request.params.id));
    if( clienteEnviar.length === 0) {
        response.status(404).end();
    } else {
        response.json(clienteEnviar);
    }

});

app.post('/api/clientes', (request, response) => {
    console.log(request.body);

    if(clients.filter(cliente=> (cliente.id == request.body.id)).length === 0) {
        clients.push(request.body);
        response.status(201).send(request.body);
    } else {
        response.status(400);
        response.send('Cliente ya existe');
    }

});

app.put('/api/clientes/:id', (request, response) => {
    console.log(request.body);

    const indiceCliente= clients.findIndex(cliente => cliente.id == request.params.id);

    if(indiceCliente > -1) {
        clients[indiceCliente].nombre= request.body.nombre;
        clients[indiceCliente].apellido= request.body.apellido;
        response.json(clients[indiceCliente]);
    } else {
        response.status(404);
        response.send('Cliente no existe');
    }

});

app.delete('/api/clientes/:id', (request, response) => {
    const idCliente= request.params.id;

    const clienteAEliminar= clients.filter(cliente=> (cliente.id == idCliente));

    if(clienteAEliminar.length === 0) {
        response.status(404);
        response.send('Cliente no existe');
    } else {
        clients= clients.filter(cliente=> (cliente.id != idCliente));
        response.json(clienteAEliminar);
    }

});

app.get('/api/cuentas', (request, response) => {
    if(cuentas.length ===0) {
        response.status(404).end();
    } else {
        response.json(cuentas);
    }
});

app.get('/api/clientes/:idCliente/cuentas', (request, response) => {
    if(clients.filter(cliente=> (cliente.id == request.params.idCliente)).length === 0) {
        response.status(404);
        response.send('Cliente no existe');
    } else {
        const cuentasCliente= cuentas.filter(cuenta=> (cuenta.idCliente == request.params.idCliente));
        if(cuentasCliente.length === 0) {
            response.status(404);
            response.send('Cliente sin cuentas');
        } else {
            response.json(cuentasCliente);
        }

    }

});

app.get('/api/clientes/:idCliente/cuentas/:idCuenta', (request, response) => {
    if(clients.filter(cliente=> (cliente.id == request.params.idCliente)).length === 0) {
        response.status(404);
        response.send('Cliente no existe');
    } else {
        const cuentasCliente= cuentas.filter(cuenta=> ((cuenta.idCliente == request.params.idCliente) && (cuenta.nroCuenta == request.params.idCuenta)));
        if(cuentasCliente.length === 0) {
            response.status(404);
            response.send('La cuenta no existe o no corresponde al cliente');
        } else {
            response.json(cuentasCliente);
        }
    }
});

app.post('/api/cuentas', (request, response) => {
    if(clients.filter(cliente=> (cliente.id == request.body.idCliente)).length === 0) {
        response.status(404);
        response.send('Cliente no existe');
    } else {
        if(cuentas.filter(cuenta=> (cuenta.nroCuenta == request.body.nroCuenta)).length === 0) {
            cuentas.push(request.body);
            response.status(201).send(request.body);
        } else {
            response.status(400); //qué status debería enviar?
            response.send('Cuenta ya existe');
        }
    }
});

app.put('/api/cuentas/:idCuenta', (request, response) => {
    if(clients.filter(cliente=> (cliente.id == request.body.idCliente)).length === 0) {
        response.status(404);
        response.send('Cliente no existe');
    } else {
        const cuentasCliente= cuentas.filter(cuenta=> ((cuenta.idCliente == request.body.idCliente) && (cuenta.nroCuenta == request.params.idCuenta)));
        if(cuentasCliente.length === 0) {
            response.status(404);
            response.send('La cuenta no existe o no corresponde al cliente');
        } else {
            const indiceCuenta= cuentas.findIndex(cuenta => cuenta.nroCuenta == request.params.idCuenta);
            if(indiceCuenta > -1) {
                cuentas[indiceCuenta].tipo= request.body.tipo;
                cuentas[indiceCuenta].idCliente= request.body.idCliente;
                cuentas[indiceCuenta].saldo= request.body.saldo;
                response.json(cuentas[indiceCuenta]);
            } else {
                response.status(404);
                response.send('Cuenta no existe');
            }
            //response.json(cuentasCliente);
        }
    }
});

app.delete('/api/cuentas/:idCuenta', (request, response) => {
    const cuentaAEliminar= cuentas.filter(cuenta=> (cuenta.nroCuenta == request.params.idCuenta));

    if(cuentaAEliminar.length === 0) {
        response.status(404);
        response.send('Cuenta no existe');
    } else {
        cuentas= cuentas.filter(cuenta=> (cuenta.nroCuenta != request.params.idCuenta));
        response.json(cuentaAEliminar);
    }
});

app.post('/api/cuentas/:idCuenta/transferencias', (request, response) => {
    const indiceCuentaOrig= cuentas.findIndex(cuenta => cuenta.nroCuenta == request.params.idCuenta);
    const indiceCuentaDes= cuentas.findIndex(cuenta => cuenta.nroCuenta == request.body.destino);
    if(indiceCuentaOrig > -1) {
        if(cuentas[indiceCuentaOrig].saldo >= request.body.monto) {
            if(indiceCuentaDes > -1) {
                cuentas[indiceCuentaOrig].saldo -= request.body.monto;
                cuentas[indiceCuentaDes].saldo += request.body.monto;
                response.status(200).end();
            } else {
                response.status(404);
                response.send('Cuenta de destino no existe');
            }
        } else {
            response.status(500);   //Ver que código enviar
            response.send('Saldo insuficiente');
        }
    } else {
        response.status(404);
        response.send('Cuenta de origen no existe');
    }
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en port ${port}`)
})