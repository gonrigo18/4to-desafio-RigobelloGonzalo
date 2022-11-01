
const express = require('express');
const { Router } = express;
const app = express();
const Container = require('./container');
const products = new Container('./products.txt');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const routerProducts = new Router();
routerProducts.use(express.json());


routerProducts.get('/', async (req, res) => {
    try {
        const product = await products.getAll();
        res.send(product);
    } catch (err) {
        console.log(err);
    }
});

routerProducts.delete('/', async (req , res) => {
    try{
        const product = await products.deleteAll();
        res.send(product);
    }
    catch (err){
        console.log(err)
    }
})

routerProducts.get('/:id', async (req, res) => {
    try {
        const product = await products.getById(parseInt(req.params.id));
        if (!product) {
            res.send('{error:  producto no encontrado }');
        }
        else {
            res.json(product);
        }
    }
    catch (err) {
        console.log(err);
    }
});

routerProducts.post('/', async (req, res) => {
    try {
        const { body } = req;
        await products.save(body);
        res.send(body);
    } catch (err) {
        console.log(err);
    }
});
routerProducts.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { body } = req;
        const updated = await products.update(body,parseInt(id));
        console.log(updated)
        res.send(updated);
    } catch (err) {
        console.log(err);
    }
});

routerProducts.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deleteProduct = await products.deleteById(parseInt(id));
        res.send(deleteProduct);
    } catch (err){
        console.log (err);
    }
});


app.use('/api/products/', routerProducts);

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server up in http://localhost:${port}`);
});

server.on('error', (err) => console.log(`Server error: ${err}`));