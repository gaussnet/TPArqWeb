const express = require('express')
const app = express()
const port = 3000

const clients = [
    {id: 34567890, nombre: 'Juan', apellido: 'Perez'},
    {id: 239432563, nombre: 'Cecilia', apellido: 'Martinez'},
    {id: 12547385, nombre: 'Luis', apellido: 'Gonzalez'}
];

app.use((request, response, next) => {
    console.log(request.method, request.path);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/clientes', (request, response) => {
    response.json(clients);
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en port ${port}`)
})