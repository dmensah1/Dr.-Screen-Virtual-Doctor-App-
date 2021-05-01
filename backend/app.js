const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();  //returns us an express app which can now be used

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors());

// initializing the firebase firestore db
const admin = require('firebase-admin');
const serviceAccount = require('./ruhacks-bedfordlions-firebase-adminsdk-b9pyb-aa260d5cdb.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://ruhacks-bedfordlions.firebaseio.com"
});
const db = admin.firestore();

const patientRoutes = require('./routes/patientRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const apptRoutes = require('./routes/apptRoutes')
const followupRoutes = require('./routes/followupRoutes')


app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', apptRoutes)
app.use('/api/followups', followupRoutes)

//exporting the module
module.exports = app;
