const fs = require('fs')

class ProductManager {
    #path;
    #acc = 0;
    constructor(path) {
        this.#path = path;
    }
    async getProducts() {
        try {
        const listaProductos = await fs.promises.readFile(this.#path, "utf-8");
        return JSON.parse(listaProductos)
        }
        catch (e) {
            return []
        }
    }
    async getProductByID(id) {
        let producto = await this.getProducts()
        let check = producto.find((prod) => prod.id === id)
        if (check) {
            return check

        }
        else if (!check) {
            throw new Error ("Product not found")
        }
    }
   async addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
        id: this.#acc,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    const producto = await this.getProducts()
        let productCODEFind = producto.find((product) => product.code === code)
        if(productCODEFind) {
        throw new Error("El producto ya existe")
        } else if (!productCODEFind){
            fs.promises.writeFile(this.#path, JSON.stringify([...producto, newProduct]))
            this.#acc++
         }
}

async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const producto = await this.getProducts()
    let update = []
    update = producto.find((producto) => producto.id === id)
    if (title === undefined) {
        title = producto[id - 1].title
    } else { update.title = title }
    if(description === undefined) {
        description = producto[id - 1].description;
    } else {update.description = description}
    if (price === undefined || price !== Number) {
        price = producto[id - 1].price;
    } else { update.price = price; }
    if(code === undefined) {
        code = producto[id - 1].code;
    } else { update.code = code}
    if (stock === undefined || stock !== Number) {
        stock = producto[id-1].stock;
    } else { update.stock = stock}
    if (thumbnail === undefined) {
        thumbnail = producto[id-1].thumbnail;
    } else { update.thumbnail = thumbnail}
    fs.promises.appendFile(this.#path, JSON.stringify(producto))
}
async deleteProduct(id) {
    let producto = await this.getProducts()
    let deleted = producto.find((producto) => producto.id === id)
    if(deleted) {

    } else if (!deleted) {
        throw new Error("El id indicado no coincide con ninguno existente")
    }

}
/* getProducts() {
    console.log(this.#products)
    return this.#products
}
getProductsByID(id) {
    let sameID= this.#products.find(product => product.id === id)
    if(!sameID) {
        throw new Error("No se ha encontrado ningún producto con el ID correspondiente")
    }
    else {
        console.log(sameID)
        return sameID
    }
} */
}



/* PRUEBA */
async function test() {
    const manager = new ProductManager("./Products.json");
/*  await manager.addProduct(
    "Producto",
    "prueba desc",
    500,
    "imagen",
    "123",
    2
);
await manager.addProduct(
    "Producto2",
    "prueba desc",
    600,
    "imagen",
    "1234",
    3
); */
manager.updateProduct(1, "updated", "updating product", 2000)
console.log(await manager.getProducts(),)
}

test()


