'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Cara upload to your local file
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

// cara upload via google storage
const helpers = require('./helpers')

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


app.get('/', (req,res) =>{
    res.send('OK')
})

// Cara upload to your local file
// app.post('/uploads', upload.single('avatar'),(req,res)=>{
//     if(!req.file){
//         console.log('ERROR')
//         res.send('Upload Failed')
//     }else{
//         res.send('Upload success')
//     }
// })

app.post('/uploads',
  helpers.multer.single('imagefile'),
  helpers.sendUploadToGCS,
  (req,res) => {
    res.status(200).json({
        msg: 'Success Upload',
        link: req.file.cloudStoragePublicUrl
    })
  }
)

app.listen(3008,()=>{
    console.log('You are listening to PORT 3008')
})