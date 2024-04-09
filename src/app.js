const express = require('express') 
const {Server} = require("socket.io")
const handlebars = require('express-handlebars') 
const mongoose = require('mongoose')

const productsRouter = require("./routes/products.router")
const cartsRouter = require("./routes/carts.router")
const DbProductsManager = require('./dao/dbManagers/productsManager')
const DbCartsManager = require('./dao/dbManagers/cartsManager')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())




app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', `handlebars`)



app.use(express.static(`${__dirname}/../public/`));

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)





app.get('/', (req, res) => {
    res.send('Hola desde Express!');
  });

  const main = async () => {

    await mongoose.connect('mongodb+srv://quimey:candela09@ecommerce.fcxz7ik.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce', {
        dbName: 'ecomerce'
    })

    const productsManager = new DbProductsManager()
    const Carts = new DbCartsManager()
    await productsManager.prepare()
    await Carts.prepare()
    app.set('productsManager', productsManager)
    app.set('cartsManager', Carts)

    app.listen(8080, () => {
        console.log('Servidor listo!')
    })
}

main()


//const wsServer = new Server(httpServer)

//app.set('ws', wsServer);

//wsServer.on('connection', (clientSocket) =>{

 // clientSocket.emit('individual', 'Mensaje individual!')

 // console.log('Cliente conectado, ID'+clientSocket.id)
//})