/* const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// midlewere
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader( 
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    )
    next()
})

app.post('/api/posts', (req, res, next) => {
    const post = req.body
    console.log(post)
    res.status(201).json({
        message: 'Post added successfully'
    })
})

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {   id: 'fasdf123',
            title: 'First server-side post',
            content: 'This is coming from the server'
        },
        {   id: 'faas4daasa12sdfdf132fa3',
            title: 'Second server-side post',
            content: 'This is coming from the server again!'
        }
    ]
    res.status(200).json({
        message: 'Post fetched successfully!',
        posts
    })
})

module.exports = app */


const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// midlewere
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader( 
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    )
    next()
})

//add blog to DynamoDB
app.post('/api/blogs', (req, res, next) => {
    const blog = req.body
    console.log(blog)
    res.status(201).json({
        message: 'Blog added successfully'
    })
})

//get all blogs from DynamoDB
app.get('/api/blogs', (req, res, next) => {
    const blogs = [
        {   id: 'fasdf123',
            title: 'First server-side blog',
            content: 'This is coming from the server'
        },
        {   id: 'faas4daasa12sdfdf132fa3',
            title: 'Second server-side blog',
            content: 'This is coming from the server again!'
        }
    ]
    res.status(200).json({
        message: 'Blog fetched successfully!',
        blogs
    })
})

module.exports = app
