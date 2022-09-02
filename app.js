const express = require('express');
const app = express();
const path = require('path');

const projetoRouter = require('./routes/projeto');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//To dizendo pra ele usar o router do projeto na rota /projeto 
app.use('/projeto', projetoRouter);


app.get('/', (req, res)=> {
    res.sendFile(path.resolve('index.html'));
});

let PORT = 8081;
app.listen(PORT, ()=> {
    console.log('Server running on port ' + PORT);
});