const express = require('express');
var indexRouter = require('./routes/index');
var cors = require('cors');

let port = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);

    
});