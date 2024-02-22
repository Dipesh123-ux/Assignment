require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const taskRoutes = require('./routes/task')

const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())

app.use('/api',taskRoutes);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to db')
})

app.listen(PORT,()=>{
    console.log('listening on port '+ PORT);
})
