const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const app = express();
const port = 5555;

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'test'
    , host: 'localhost'
    , database: 'todo_list'
    , password: 'test'
    , port: 5432,
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(rq, rs, nxt) //request, response, next
{
    var path = `${__dirname}/README.md`;
    var file = fs.readFileSync(path, 'utf8');
    rs.send(marked(file.toString()))    
    //rs.sendFile('README.md');

});

//NOTE: GET all tasks
app.get('/task', function(rq, rs) //request, response
{
    pool.query('select * from tasks order by createdAt desc'
        , (error, results) =>{
        if (error){
            throw error;
        }
        rs.status(200).json({
            message: 'Getting tasks'
            , data: results.rows})
    });
});

//NOTE: PSOT to create new task
app.post('/task/create', function(rq, rs) //request, response
{
    var bdy = rq.body;
    console.log(bdy);

    pool.query('begin');
    pool.query(`insert into tasks (title, dueDate, priority, createdAt, updatedAt)
        values
        ($1, $2, $3,current_timestamp,current_timestamp)
        returning id, dueDate, priority, createdAt, updatedAt`
        , [bdy.name, bdy.dueDate,parseInt(bdy.priority)]
        , (error, results) =>{
        if (error){
            pool.query('rollback')
            rs.status(500).json({
                "status": 500
                , "errors": error
            })
            throw error;
        }
        pool.query('commit');
        rs.status(201).json({
            message: 'Insert new task'
            , data: results.rows})
    });
});

//NOTE: DELETE to delete tasks by id
app.delete('/task/:id', function(rq, rs) //request, response
{
    var id = parseInt(rq.params.id);
    
    pool.query(`delete from tasks where id = $1
        returning id, title as name, dueDate, priority, createdAt, updatedAt`
        , [id]
        , (error, results) =>{
        if (error){
            rs.status(400).json({
                "status": 400
                ,"validationErrors": "No id provided."
            })
            throw error;
        }

        if( !results.rows.length )
        rs.status(400).json({
            "status": 400
            ,"validationErrors": "No id provided."
        });
        else
        rs.status(200).json({
            message: 'Deleted task'
            , data: results.rows});
    });
});

//NOTE: PUT to update tasks by id
app.put('/task/update/:id', function(rq, rs) //request, response
{
    var id = parseInt(rq.params.id);
    
    pool.query(`update tasks
        set dueDate = '2021-01-25'
        , set updatedAt = current_timestamp   
        where id = $1
        returning id, title as name, dueDate, priority, createdAt, updatedAt`
        , [id]
        , (error, results) =>{
        if (error){
            rs.status(500).json({
                "status": 500
                ,"errors": error
            })
            throw error;
        }

        if( !results.rows.length )
        rs.status(500).json({
            "status": 500
            ,"validationErrors": "No id provided."
        });
        else
        rs.status(200).json({
            message: 'Deleted task'
            , data: results.rows});
    });
});



//NOTE: GET task by id
app.get('/task/:id', function(rq, rs) //request, response
{
    var id = parseInt(rq.params.id)
    pool.query('select * from tasks where id = $1', [id]
        , (error, results) =>{
        if (error){
            throw error;
        }
        rs.status(200).json({
            message: 'Getting task by id'
            , data: results.rows})
    });
});

//NOTE: Run the app on port 5555
app.listen( port, function()
{
    console.log(`
        Server listening on http://localhost:${port}
    `);
});