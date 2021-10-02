var express = require('express');

var app = express();

app.use(require('./js/routes'));

// app.use(express.static('image'));
// app.use(express.static('html'));

app.listen(3000, () => { 
    console.log('Server running at port 3000') 
});