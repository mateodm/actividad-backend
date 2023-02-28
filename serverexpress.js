import ProductManager from "./src/app.js"
import express from "express";
const app = express()
const item = new ProductManager();


app.get("./app/productos.json/:id",
    async (request, response) => { 
        const productID = await Number(request.params.id)
        const getProduct = await item.getProductByID(productID)
        await response(getProduct)

    }      
)

app.get("./app/productos.json", 
    async (request,response) => {
        const {limite} = request.query;
        if(limite) {
            const products = await item.getProducts()
            await response.send(products)
        }
        else {
            const products = await item.getProducts()
            const filterProducts = products.splice(0, limite)
            await response.send(products)
        }
    }
)
app.listen(8080, () => {
    console.log(`Server listening`)
  })