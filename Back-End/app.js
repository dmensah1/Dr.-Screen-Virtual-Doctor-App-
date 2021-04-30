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


// initializing the firebase firestore db
const admin = require('firebase-admin');
const serviceAccount = require('./ruhacks-bedfordlions-firebase-adminsdk-b9pyb-aa260d5cdb.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://ruhacks-bedfordlions.firebaseio.com"
});
const db = admin.firestore();

const patientRoutes = require('./routes/patientRoutes')


app.use('/api/patients', patientRoutes);


//exporting the module
module.exports = app;
