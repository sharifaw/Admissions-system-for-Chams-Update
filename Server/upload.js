const express = require('express')
const app = express()
const port = 3000
const uuid = require("uuid");
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads")
    },
    filename: (req,file,cb) => {
        const {originalname} = file;
        let fileName = `${uuid.v4()}-${originalname}`;
        cb(null,fileName);
    }
})

const upload = multer({ storage })

app.use(express.static("public"))

module.exports={storage,upload}; 