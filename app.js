const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/scinethub',
// mongoose.connect('mongodb+srv://gyd_mongo_db_0:ILnkMpC5KSorPF2K@cluster0.tpf4nst.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !',error));
  
  app.use(cors({
    origin:[
      'http://localhost:4200',
      'http://localhost:8100',
    ]
  }))
  app.use(bodyParser.json({ limit: '200MB' }))
  app.use(bodyParser.urlencoded({
    extended:false
  }))
  app.use('/api/user', userRoutes);
  
module.exports = app;
