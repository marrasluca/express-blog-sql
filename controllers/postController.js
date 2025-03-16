const posts = require('../data/posts');
const connection = require('../data/db');

function index(req, res) {

    const sql = 'SELECT * FROM posts'; //query database

    //esecuzione della query
    connection.query( sql,(err, results) => {
        if(err) return res.status(500).json({
            error: 'Errore nel Server'
        })
        res.json( results )
    })
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if(!post){
        res.status(404)

        return res.json(
            {
                status: 404,
                error: "Not found",
                message: 'Post not found'
            }
        );
    }
    res.json(post);  
}

function store(req, res) {
     // Calcola il nuovo ID per il post
    const newId = posts[posts.length - 1].id +1 


     // Crea il nuovo post con i dati ricevuti dalla richiesta
    const newPost = {
        id : newId,
        title : req.body.title,
        content : req.body.content,
        tags : req.body.tags

    }
     posts.push(newPost); // Aggiungi il nuovo post all'array dei post
     console.log(posts);
     res.status(201).json(newPost);
    
}

function update(req, res) {

    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if(!post){
        res.status(404)

        return res.json(
            {
                status: 404,
                error: "Not found",
                message: 'Post not found'
            }
        );
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

        console.log(posts);

    res.json(post);  
}

function patch(req, res) {
    
}

function destroy(req, res) {
    // const id = parseInt(req.params.id); //estrae l'ID dal parametro della richiesta

    // const post = posts.find(post => post.id === id);//trova il post con l'ID

    // posts.splice(posts.indexOf(post), 1); //cerca il post nell'array e lo rimuove usando splice
    // res.sendStatus(204);//indica che la richiesta è stata completata con successo
    
}

module.exports = {index, show, store, update, patch, destroy};
