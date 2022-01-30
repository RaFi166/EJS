const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Blog = require('./models/blog')
const port = 3000

//register view engine
app.set("view engine", "ejs");

//static middleware
app.use(express.static('public'));

//catch data middleware
app.use(express.urlencoded())

//db
const db = 'mongodb+srv://ninja-express:S8GQw0afScEe6MrL@cluster0.opetx.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(db)
    .then((result) => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("not connected yet");
    })
//db
// S8GQw0afScEe6MrL ninja-express

//first Middleware 
app.use((req, res, next) => {
    console.log("First Middleware");
    console.log('host :', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next()
})

//file render
app.get("/", (req, res) => {
    res.render("index", { title: "Rafi" })
})

//createing blogs
app.get("/create-blog", (req, res) => {
    const blog = new Blog({
        title: "hello man",
        snippets: "hello snippets",
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, nostrum?"
    });
    blog.save()
        .then((result) => {
            res.send("result is", result)
        })
        .catch((err) => {
            res.send("error found", err);
        })
})
//get post delete..............
//post
app.post("/create-blog", (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect("/views/index.ejs");
        })
        .then((err) => { console.log("error is", err) })

})

//retrieve blog data
app.get("/allblogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => { res.send(err) })
})

//single data
app.get("/singleblog", (req, res) => {
    Blog.findById("5654sd444d4s4saw4")
        .then((result) => { res.send(result) })
        .catch((err) => { res.send(err) })
})

app.get("/about", (req, res) => {
    res.render("about", { title: rafi })
})

//redirect
app.get("/about-us", (req, res) => {
    res.redirect("/about")
})

//404
app.use((req, res) => {
    res.render("404")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})