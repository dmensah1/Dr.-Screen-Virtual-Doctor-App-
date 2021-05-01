const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// Create a new prescription
// api/prescriptions/
router.post('/', (req, res) => {
    db.collection('prescriptions').add({
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
        drugName: req.body.drugName,
        message: req.body.message,
        prescribedDate: req.body.prescribedDate,
        duration: req.body.duration
    }).then(doc => {
		console.log('Added a prescription document with ID: ' + doc.id);
		res.status(200).json({
            prescriptionId: doc.id
        });
	}).catch(error => {
		console.log(error);
		res.status(500);
	});
});

// Delete a prescription
// api/prescriptions/:id
router.delete('/:id', (req, res) => {
    return db.collection('prescriptions').doc(req.params.id).delete()
    .then(appt => {
        res.status(200).json({
            message: 'Prescription Deleted.'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Prescription not found");
    });
});

// Get all prescriptions for a patient
// api/prescriptions/forPatient/:id
router.get('/forPatient/:id', (req, res) => {
    let patientId = req.params.id;

    db.collection('prescriptions').get().then(snapshot => {
        let patientsPrescriptions = [];

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());

            if (doc.data().patientId == patientId) {
                patientsPrescriptions.push({
                    id: doc.id,
                    doctorId: doc.data().doctorId,
                    patientId: doc.data().patientId,
                    drugName: doc.data().drugName,
                    message: doc.data().message,
                    prescribedDate: doc.data().prescribedDate,
                    duration: doc.data().duration
                })
            }
        })

        res.status(200).json(patientsPrescriptions)
    })

})



module.exports = router;