const express = require('express')
const { Router } = express;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const routerProducts = new Router();

routerProducts.use(express.json());

const allProducts = [];

routerProducts.get('/', (req, res) => {
    res.send(allProducts);
})

routerProducts.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(allProducts[id]);
})

routerProducts.post ('/', (req,res)=>{
    const {body} = req;
    allProducts.push(body);
    res.send(body);
})


app.use('/api/products', routerProducts);

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server up in http://localhost:${port}`);
});

server.on('error', (err) => console.log(`Server error: ${err}`));