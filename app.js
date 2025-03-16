const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const postRouter = require('./routers/postsRouter'); //Importa un router per gestire le operazioni relative ai post

//middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

app.use(cors()); 

app.use(express.static('public')); //cartella statica

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ciao a tutti!');
})

app.use('/api/posts', postRouter); //router


app.use(errorsHandler)
app.use(notFound);



//avvio del server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});