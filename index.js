const express = require('express');
const knex = require('./src/knex');
let app = express();
app.use('/', require('./routes/api'));
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})