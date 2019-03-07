const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

var  routes =require('./routes');


app.use(bodyParser.json());

app.get('/', routes.index);
app.post('/',routes.store);
app.get('/:id',routes.search);
app.delete('/:id',routes.erase);
app.put('/:id',routes.replace);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
