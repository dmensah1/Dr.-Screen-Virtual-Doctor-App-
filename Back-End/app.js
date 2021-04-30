const express = require('express');
const bodyParser = require("body-parser");

const app = express();  //returns us an express app which can now be used

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//declaring headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});


//exporting the module
module.exports = app;
