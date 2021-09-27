const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","*" /*"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,X-Content-Type-Options:nosniff, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"*/);
    next();
});



module.exports={app};