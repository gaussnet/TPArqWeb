const express = require('express')
const app = express()
const port = 3000

let clients = [
    {id: 34567890, nombre: 'Juan', apellido: 'Perez'},
    {id: 239432563, nombre: 'Cecilia', apellido: 'Martinez'},
    {id: 12547385, nombre: 'Luis', apellido: 'Gonzalez'}
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

app.post('/api/clientes', (request, response) => {
    console.log(request.body);
    clients.push(request.body);
    response.status(201).send(request.body);
});

app.delete('/api/clientes/:id', (request, response) => {
    const idCliente= request.params.id;

    const clienteAEliminar= clients.filter(cliente=> (cliente.id == idCliente));
    clients= clients.filter(cliente=> (cliente.id != idCliente));

    //response.json(clients);
    response.json(clienteAEliminar);
    //response.status(204).end(); //204: no content. Indica que no se devuelve contenido.
    // end() lo uso para finalizar el response sin enviar datos
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en port ${port}`)
})