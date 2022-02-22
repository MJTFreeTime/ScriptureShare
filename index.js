// Outside Modules
const express = require('express');

// Express app initialization
const app = express();

// App variables (e.g. port)
const port = 3000;

// JS Files
const galleryDisplayJS = require('./js/gallery_display.js');
const galleryUploadJS = require('./js/gallery_upload.js');

// Static paths definitions
app.use(express.static('public'));

// Routing setup
galleryDisplayJS.image_names(app);
galleryUploadJS.image_upload(app);

app.listen(port, () => {
    console.log("Express server listening on port 3000");
});