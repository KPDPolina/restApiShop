let express = require("express");
let app = express();
app.get('/', function(req, res) {
    res.send('Hello API');
})
app.listen(3012)