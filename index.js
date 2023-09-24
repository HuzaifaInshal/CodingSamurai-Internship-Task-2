const express =require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./database/config/db')
const colors = require('colors')
const path = require('path')
const {errorHandler} = require('./middlewares/handleError')
const cors = require('cors');

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/task',require('./routes/taskRoutes'))

app.use(errorHandler)

app.use(express.static(path.join(__dirname,'./frontend/dist/')))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'./','frontend','dist','index.html')))


app.listen(port,()=>console.log(`Server is listening at Port ${port}`))