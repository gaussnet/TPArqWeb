const express = require('express')
const app = express()
const port = 3000

let clients = [
    {id: 34567890, nombre: 'Juan', apellido: 'Perez'},
    {id: 239432563, nombre: 'Cecilia', apellido: 'Martinez'},
    {id: 12547385, nombre: 'Luis', apellido: 'Gonzalez'}
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
    response.json(clients);
});

app.get('/api/clientes/:id', (request, response) => {
    //const idCliente= request.params.id;

    //const clienteEnviar= clients.filter(cliente=> (cliente.id == idCliente));
    const clienteEnviar= clients.filter(cliente=> (cliente.id == request.params.id));
    if( clienteEnviar.length === 0) {
        response.status(404).end();
    } else {
        response.json(clienteEnviar);
    }

});

app.post('/api/clientes', (request, response) => {
    console.log(request.body);
    //console.log(request.body.id);
    //const clienteCrear= clients.filter(cliente=> (cliente.id == request.body.id));
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
        response.status(404).end();
    }

});

app.delete('/api/clientes/:id', (request, response) => {
    const idCliente= request.params.id;

    const clienteAEliminar= clients.filter(cliente=> (cliente.id == idCliente));

    if(clienteAEliminar.length === 0) {
        response.status(404).end();
    } else {
        clients= clients.filter(cliente=> (cliente.id != idCliente));
        response.json(clienteAEliminar);
    }
    //const clienteAEliminar= clients.filter(cliente=> (cliente.id == idCliente));
    //clients= clients.filter(cliente=> (cliente.id != idCliente));

    //response.json(clients);
    //response.json(clienteAEliminar);
    //response.status(204).end(); //204: no content. Indica que no se devuelve contenido.
    // end() lo uso para finalizar el response sin enviar datos
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en port ${port}`)
})