const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

const patientsRef = 

// Create a new doctor
// /api/doctors/
router.post('/', (req, res) => {
    const doctorData = {
        id: req.body.id,
        email: req.body.email,
        fullName: req.body.fullName,
        clinicAddress: req.body.clinicAddress,
        isDoctor: req.body.isDoctor,
        patientIds: []
    }

    return db.collection('doctors').doc(doctorData.id).set(doctorData)
    .then(() => {
        console.log('New Doctor Created')
        res.status(200).json({
            message: 'Created Successfully.'
        })
    })
    .catch((err) => console.log(err))
});

// Get a doctor by id
// /api/doctors/id
router.get('/:id' , (req, res) => {
    db.collection('doctors').doc(req.params.id).get()
        .then(user => {
            res.status(200).json({
                doctor: user.data()
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("User not found");
        });
});

// Add a patientId to the doctor
// api/doctors/addPatient
router.put('/addPatient', (req, res) => {
    let doctorId = req.body.doctorId;
    let patientToAdd = req.body.patientId;

    let doctorRef = db.collection('doctors').doc(doctorId);
    doctorRef.update({
        patientIds: admin.firestore.FieldValue.arrayUnion(patientToAdd)
    }).then(()=> {
		console.log(`Successfully added patient ${patientToAdd} to doctor ${doctorId}`);
		res.status(200).send(`Successfully added patient ${patientToAdd} to doctor ${doctorId}`);
	}).catch(() => {
		console.log(`Error adding patient ${patientToAdd} to doctor ${doctorId}`);
		res.status(500).send(`Error adding patient ${patientToAdd} to doctor ${doctorId}`);
	});

});


// Get all patients for a doctor
// api/doctors/getPatients/:id
router.get('/getPatients/:id', async (req, res) => {
    let patientIds = [];

    // db.collection('patients').where('doctorId', '==', req.params.id).get().then(result => {
    //     result.forEach(item => {
            
    //     })
        
    // }).catch(err => {
    //     console.log(err);
    // })





});

module.exports = router;