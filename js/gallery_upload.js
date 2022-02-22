// Outside Modules
const multer = require('multer');

// Multer Setup
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/pictures")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_" + file.originalname)
	},
})

const upload = multer({ storage : storage }).single('file_input'); // .single(nameFromForm) for single file upload

// Function for handling API image uploading
function image_upload(app) {
	app.post('/api/gallery/upload_image', (req, res) => {
		upload(req, res, err => {
			if (err)
				res.send('ERROR');
			else
				res.send('Successfully uploaded files');
		});

	});
}

// Exports for other JS files to use
module.exports = {
	image_upload
};