// const express = require('express');
// const app = express();
// const server = app.listen(3000, ()=>{
//   console.log('start server');
// });

// //connect db
// const maria = require('mysql');
// const conn = maria.createConnection({
//   host:'127.0.0.1',
//   port:3307,
//   user:'root',
//   password:'910226',
//   database:'young'
// });

// conn.connect();

// //select
// app.get('/s', (req, res)=>{
//   conn.query('SELECT * FROM TOPIC',(err,row,fields)=>{
//     res.send(row)
//     //res.send(fields);
//   })
// });