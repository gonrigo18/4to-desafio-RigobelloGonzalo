const { promises: fs } = require('fs')

class Container {

    constructor(route) {
        this.route = route
    }

    async getAll() {
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`, 'utf-8'))
            return content
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async deleteAll() {
        try {
            await fs.unlink(`./${this.route}`)
            console.log("Archive deleted successfully")
        } catch (err) {
            console.log(err)
        }
    }
    async deleteById(id) {
        try {
            const content = await this.getAll()
            const filter = content.filter(e => e.id !== id)
            await fs.writeFile(`./${this.route}`, JSON.stringify(filter, null, 2))
            return "Successfully deleted"
        } catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`, 'utf-8'))
            const find = content.find(e => e.id === id)
            return find
        }
        catch (err) {
            console.log(err)
        }
    }

    async save(product) {
        try {
            const products = await this.getAll()
            const lastItem = products[products.length - 1]
            const id = lastItem.id + 1;
            const newProduct = { id: id, title: product.title, price: product.price, thumbnail: product.thumbnail }
            await products.push(newProduct)
            await fs.writeFile(`./products.txt`, JSON.stringify(products, null, 2))
        } catch (err) {
            console.log(err)
        }
        return "Item saved successfull"
    }


    async update(product, id) {
        try {
            const products = await this.getAll()
            const updatedProduct = { id: id, title: product.title, price: product.price, thumbnail: product.thumbnail }
            console.log(updatedProduct)
            await products.push(updatedProduct)
            await fs.writeFile(`./products.txt`, JSON.stringify(products, null, 2))
        } catch (err) {
            console.log(err)
        }
        return "Item updated successfull"
    }
}
module.exports = Container
