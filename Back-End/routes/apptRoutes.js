const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// creates an appt
// api/appointments/
router.post('/', (req, res) => {
    db.collection('appointments').add({
        date:  req.body.date,
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
        followUpId: null  // a follow up needs to be created before an appt
    }).then(doc => {
		console.log('Added a class document with ID: ' + doc.id);
		res.status(200).json({
            apptID: doc.id
        });
	}).catch(error => {
		console.log(error);
		res.status(500);
	});
});


// delete an appointment
// api/appointments/:id
router.delete('/:id', (req, res) => {
    return db.collection('appointments').doc(req.params.id).delete()
        .then(appt => {
            res.status(200).json({
                message: 'Appointment Deleted.'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Appt. not found");
        });
});


// get all appts for a specific doctor
// api/appointments/forDoctor/:id
router.get('/forDoctor/:id', (req, res) => {
    db.collection('appointments').get().then(snapshot => {
        let doctorsAppts = [];

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            if (doc.data().doctorId == req.params.id) {
                doctorsAppts.push(
                    {
                        id: doc.id,
                        date: doc.data().date,
                        doctorId: doc.data().doctorId,
                        patientId: doc.data().patientId,
                        followUpId: doc.data().followUpId
                    }
                )
            }
        });
        res.status(200).json({
            fetchedAppointments: doctorsAppts
        })
    });    
})


// get all appts for a specific patient
// api/appointments/forPatient/:id
router.get('/forPatient/:id', (req, res) => {
    db.collection('appointments').get().then(snapshot => {
        let patientsAppts = [];

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            if (doc.data().patientId == req.params.id) {
                patientsAppts.push(
                    {
                        id: doc.id,
                        date: doc.data().date,
                        doctorId: doc.data().doctorId,
                        patientId: doc.data().patientId,
                        followUpId: doc.data().followUpId
                    }
                )
            }
        });
        res.status(200).json({
            fetchedAppointments: patientsAppts
        })
    }); 
})


module.exports = router;

