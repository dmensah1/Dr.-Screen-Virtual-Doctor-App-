const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();


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

    return db.collection('doctors').add(doctorData)
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
router.get('/:id' , async (req, res) => {
    let uid = req.params.id;

    const doctorsRef = db.collection('doctors');
    const snapshot = await doctorsRef.where('id', '==', uid).get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
      
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    
        res.status(200).json(doc.data());
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
    let doctorId = req.params.id;

      
    const patientsRef = db.collection('patients');
    const snapshot = await patientsRef.where('doctorId', '==', doctorId).get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  

      const patients = [];
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());

        // note the id im using here
            patients.push({
                id: doc.data().id,
                email: doc.data().email,
                fullName: doc.data().fullName,
                birthday: doc.data().birthday,
                isDoctor: doc.data().isDoctor,
                doctorId: doc.data().doctorId
            })
        });

        res.status(200).json(patients);

});

module.exports = router;