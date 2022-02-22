// Outside Modules
const fs = require('fs');

function image_names(app) {
	app.get('/api/gallery/image_names', (req, res) => {
		fs.readdir('public/pictures', (err, fileNames) => {
			res.send(JSON.stringify(fileNames));
		})
	});
}

// Exports for other JS files to use
module.exports = {
	image_names
};