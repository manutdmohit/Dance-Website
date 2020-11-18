const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const port = 8000;

// mongoose stuffs
const mongoose = require('mongoose');
// Linking Database or Creating 
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true, useUnifiedTopology: true});
// Testing connection is succesfull or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String,
  });

// Creating model or collection in database 
const Contact = mongoose.model('Contact', contactSchema);


//Express Stuffs
app.use('/static', express.static('static')); //to serve static files 
app.use(express.urlencoded());

//Pug Stuffs
app.set('view engine', 'pug'); //setting the template engine as pug
app.set('views',path.join(__dirname, 'views')); //set the views directory

//Endpoints
app.get('/', (req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});

app.get('/contact', (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});

//Getting post from contact form
app.post('/contact', (req,res)=>{
    var userData = new Contact(req.body);
    userData.save().then(()=>{
        res.send("Data is Saved in DataBase");
    }).catch(()=>{
        res.status(404).send("Data is not Saved");
    });
});

app.listen(port , ()=>{
    console.log(`This application is started on port ${port}`);
});
