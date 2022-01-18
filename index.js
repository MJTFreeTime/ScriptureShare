const express = require('express');
const images = require('./js/images')
const app = express();

app.use(express.static('public'))

images.loadImages(app)

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});