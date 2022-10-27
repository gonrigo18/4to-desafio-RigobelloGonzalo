const express = require('express')
const { Router } = express
const app = express()

const routerProducts = new Router()


app.use(express.urlencoded({ extended: true }))


let allProducts = [];

routerProducts.get('/', (req, res) => {
    res.send(allProducts)
})

routerProducts.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(allProducts[id])
})





app.use('/api/products', routerProducts)
const port = 8080;

const server = app.listen(port, () => {
    console.log(`Server up in http://localhost:${port}`)
})

server.on('error', (err) => console.log(`Server error: ${err}`));