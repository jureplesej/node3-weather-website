const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup  handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abra'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abra'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a help message!',
        title: 'Help',
        name: 'Abra'
    });
});



app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'Your must provide a search term!'
        });
    }
    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
      
            if (error) {
                return res.send({ error });
            }
      
            
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress

            });
      
        });
        
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: {}
    });
});


app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Cant find the help page!',
        title: '404',
        name: 'Abra'
    });
});



app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Cant find the page!',
        title: '404',
        name: 'Abra'
    });
});



// app.com
// app.com/hepl
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});