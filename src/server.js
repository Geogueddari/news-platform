require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/authentification',authRoutes);
app.use('/api/users' , usersRoutes);
// Routes
app.use('/api/news', newsRoutes);

// TODO: Question 3 - Ajouter un middleware pour gérer les erreurs
app.use((err, req, res) => {
  if(err.message){
    console.error(err.stack);
    const message = 'Internal Server Error';
    res.status(err.status || 500).json({message});
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});