const express = require('express')
const cors = require('cors')

require('./database/config')
const User = require('./database/userDatabase')
const Book = require('./database/bookDatabase')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/signup', async (req, res) => {

    // const User = await userCollection()
    
    let data = new User(req.body)
    let result = await data.save()
    res.send(result)

})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password") // removes password from the fetched object
        if (user)
        {
            res.send(user)
        }
        else
        {
            res.send({result:"Matching user not found in database."})
        }
    }
    else
    {
        res.send({result:"Please enter the email and password."})
    }

})

app.post('/add-book', async (req, res) => {

    let data = new Book(req.body)
    let result = await data.save()
    res.send(result)

})

app.get('/all-books', async (req, res) => {

    let data = await Book.find()

    if (data.length>0){
        res.send(data)
    }
    else{
        res.send({result:"Go to 'Add a New Book' and add your favorite books today!"})
    }

})

app.delete('/book/:id', async (req, res) => {

    let data = await Book.deleteOne({_id:req.params.id})
    res.send(data)
})

app.get('/book/:id', async (req, res) => {

    let data = await Book.findById({_id:req.params.id})
    if(data)
    {
        res.send(data)
    }
    else
    {
        res.send({result:"No record found."})
    }
})

app.put('/update-book/:id', async (req, res) => {

    let data = await Book.updateOne({_id:req.params.id}, {
        $set : req.body
    })
    res.send(data)
    

})

app.get('/search/:key', async (req, res) => {
    let result = await Book.find({
        '$or':[
            {name:{$regex:req.params.key, $options:'i'}},
            {author:{$regex:req.params.key, $options:'i'}},
            {genre:{$regex:req.params.key, $options:'i'}}
        ]
    })

    res.send(result)
})

app.listen(4500)
