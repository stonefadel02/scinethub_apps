const express = require('express');
const app = express();
const port = 3001;
// app.get('/',(req,res)=> {
//     res.status(200).json(data)
// })
const mongoose = require('mongoose');
app.use(express.json());

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/scinethub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à la base de données établie');
}).catch((err) => {
  console.error('Erreur de connexion à la base de données : ' + err);
});

const authRoutes = require('./routes/user.route'); 
app.use('/user.route', authRoutes);

app.listen(port, () => console.log(`Notre application Node est demarre sur : http://localhost:${port}`));




