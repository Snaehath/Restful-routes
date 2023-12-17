const express = require('express')
const app = express();
const path = require('path');
var methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set("views",path.join(__dirname,'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id : uuid(),
        username : 'Cat',
        comment : 'Who ate my fish meow!'
    },
    {
        id : uuid(),
        username : 'dog',
        comment : "Woof, I am not"
    },
    {
        id : uuid(),
        username : 'snake',
        comment : "Hisss, I ate it and i will eat you too!!"
    }
]
app.get('/comments',(req,res) =>{
    res.render('comments/index',{comments})
})

app.get('/comments/new',(req,res) =>{
    res.render('comments/new')
})

app.post('/comments',(req,res) =>{
    const {username,comment} = req.body
    comments.push({username,comment,id:uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id',(req,res) =>{
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show',{comment})
})

app.get('/comments/:id/edit',(req,res) =>{
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit',{comment})
})

app.patch('/comments/:id',(req,res) =>{
    const {id} = req.params
    const newComment = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newComment
    res.redirect('/comments')

})
app.delete('/comments/:id',(req,res) =>{
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})
app.listen(3000, () =>{
    console.log("Listening on port 3000!!")
})