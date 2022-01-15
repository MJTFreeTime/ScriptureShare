const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const fs = require("fs");
const app = express();

var arr; // To store array of photo file names from /public/pictures

function sortArray() { // Utilizes bubble sort to sort the array of images by their numbers
    var change = true
    while (change) {
        change = false // Initially set to false
        for (let i = 1; i < arr.length; i++) {
            var prevDigitLen = arr[i - 1].length - 10 // Substract 10 for 'image' and '.jpeg'
            var prev = Number(arr[i - 1].substr(5, prevDigitLen)); // Previous image substring
            
            var currDigitLen = arr[i].length - 10 // Substract 10 for 'image' and '.jpeg'
            var currNum = Number(arr[i].substr(5, currDigitLen)); // Current image substring

            if (prev > currNum) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; // Swap filename strings
                change = true // Change made
            }
        }
    }
}

app.use(express.static('public'))

function refreshArray() {
    arr = []
    fs.readdirSync("public/pictures").forEach(fileName => {
        arr.push(fileName);
    })
    sortArray();
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pictures');
    },
    filename: (req, file, cb) => {
        refreshArray();
        var highest = 0
        for (let i = 0; i < arr.length; i++) {
            var digitsLen = arr[i].length - 10 // Substract 10 for 'image' and '.jpeg'
            var fileNum = Number(arr[i].substr(5, digitsLen)); // Current image substring
            if (fileNum > highest) {
                highest = fileNum;
            }
        }
        
        cb(null, 'image' + (highest + 1) + '.jpeg');
    }
})

const upload = multer({ storage });

function sendImages(res) {
    refreshArray()
    res.write("data: " + arr + "\n\n");
}

app.get('/gallery/sendStr/', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    sendImages(res)
});

app.post('/upload/status', upload.array('image'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});