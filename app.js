const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const app = express();
const port = 5555;


app.get('/', function(rq, rs, nxt) //request, response, next
{
    var path = `${__dirname}/README.md`;
    var file = fs.readFileSync(path, 'utf8');
    rs.send(marked(file.toString()))    
    //rs.sendFile('README.md');

});

//NOTE: Run the app on port 5555
app.listen( port, function()
{
    console.log(`
        Server listening on http://localhost:${port}
    `);
});