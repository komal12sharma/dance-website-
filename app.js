const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 8000;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String,
});
const Contact = mongoose.model('contact', contactSchema);

// express specific stuff
app.use('/static', express.static('static'))// for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory

// endpoints
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
})
app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send("this item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug')
})

// start the server
app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
});