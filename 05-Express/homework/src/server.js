// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

let newId = 1;
// TODO: your code to handle requests
server.post('/posts', (req, res) => {
    const {author,title,contents} = req.body;
    if(author && title && contents){
        let newPost = {author, title, contents, id: newId};
        posts.push(newPost);
        newId++;
        res.json(newPost);
    }
    else {
        res.status(STATUS_USER_ERROR);
        res.json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    };
});

server.post('/posts/author/:author', (req, res) => {
    const {title,contents} = req.body;
    const {author} = req.params;
    let id = posts.length + 1; 
    if(!title || !contents || !author) {
        return res
            .status(STATUS_USER_ERROR)
            .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {author, title, contents, id: id++};
    posts.push(post);
    res.status(200).json(post);
});

server.get('/posts', (req, res) => {
    let {term} = req.query;
    if(term) {
        const term_posts = posts.filter(
            p => p.title.includes(term) || p.contents.includes(term)
        );
        return res.json(term_posts);
    }
    res.json(posts);
});

server.get('/posts/:author', (req, res) => {
    let {author} = req.params;
    const author_posts = posts.filter(
        post => post.author === author
    );
    if(author_posts.length > 0){
        // console.log('acá');
        res.json(author_posts);
    }
    else {
        // console.log('aca 2');
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
    }
});

server.get('/posts/:author/:title', (req, res) => {
    let {author,title} = req.params;
    if (author && title) {
        const new_posts = posts.filter(post => post.author === author && post.title === title);
        if(new_posts.length > 0){
            // console.log('acá');
            res.json(new_posts);
        }
        else {
            // console.log('aca 2');
            res
                .status(STATUS_USER_ERROR)
                .json({error: "No existe ningun post con dicho titulo y autor indicado"});
        }
    }
    else {
        res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"});
    }
});

server.put('/posts', (req, res) => {
    const {id, title, contents} = req.body;
    // let postId = posts.filter(p => p.id === id);
    // console.log(id, title, contents); 
    if (id && title && contents) {
        let post = posts.find(p => (p.id === parseInt(id)));
        // console.log(post);
        if (post) {
            // console.log('encontré un found');
            post.title = title;
            post.contents = contents;
            res.json(post);
        }
        else {
            // console.log('no hay found');
            res
                .status(STATUS_USER_ERROR)
                .json({error: 'No existe ningun post con dicho id'});
        }
    }
    else {
        // console.log('falta algo');
        res
            .status(STATUS_USER_ERROR)
            .json({error: 'No se recibieron los parámetros necesarios para modificar el Post'});
    }
});

server.delete('/posts', (req, res) => {
    let idDelete = req.body.id;
    if(idDelete) {
        const post = posts.find(p => p.id === parseInt(idDelete));
        // console.log(post);
        if (post) {
            posts = posts.filter(p => p.id !== parseInt(idDelete));
            return res.json({success: true});
        }
        else {
            res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});        
        }
    }
    res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
});

server.delete('/author', (req, res) => {
    let authorDelete = req.body.author;
    if(authorDelete) {
        const post = posts.find(p => p.author === authorDelete);
        console.log(post);
        if (post) {
            let deletedPosts = posts.filter(p => p.author === authorDelete);
            posts = posts.filter(p => p.author !== authorDelete);
            return res.json(deletedPosts);
        }
        else {
            res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});        
        }
    }
    res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
});

module.exports = { posts, server };
