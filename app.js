const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=> {
    res.sendFile(path.resolve('index.html'));
});

let PORT = 8081;
app.listen(PORT, ()=> {
    console.log('Server running on port ' + PORT);
});