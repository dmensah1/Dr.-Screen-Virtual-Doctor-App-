const express = require('express');
const router = express.Router();
// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs-node');

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// creates an appt
// api/appointments/
router.post('/', async (req, res) => {
    const model = await tf.loadLayersModel('http://localhost:4000/model.json');
    const boolSymptomsArr = req.body.symptoms;

    const example = [boolSymptomsArr]
        const prediction = model.predict(tf.tensor(example));

        //converting predictions
        let unsortedPredictions = await prediction.array();
        let tempPredictions = [...unsortedPredictions[0]];
        unsortedPredictions = unsortedPredictions[0];
        let sortedArray = [];

        let sortedPredictions = tempPredictions.sort();
        sortedPredictions.forEach(element => {
            if(!element.toString().includes('e')) {
                sortedArray.push(element);
            }
        })
        sortedArray = sortedArray.slice(Math.max(sortedArray.length - 5, 0))
        
        let indexArray = []
        for (let i = 0; i < sortedArray.length; i++) {
            for (let j = 0; j < unsortedPredictions.length; j++) {
                if (sortedArray[i] == unsortedPredictions[j]) {
                    let result = {index: j, confidencePercent: unsortedPredictions[j]*100}
                    indexArray.push(result)
                    break;
                }
            }
        }

        indexArray.reverse();

        let startTime = req.body.date.slice(0, 10);
        let endTime = req.body.date.slice(0, 10);


        let timeArray = req.body.time;

        let sTime = timeArray.split('-')[0];
        
        let eTime = timeArray.split('-')[1];

        console.log(sTime)
        console.log(eTime)

        startTime += `T${sTime}`;
        endTime += `T${eTime}`;

    db.collection('appointments').add({
        date:  req.body.date,
        startTime: startTime,
        endTime: endTime,
        time: req.body.time,
        doctorId: req.body.doctorId,
        doctorName: req.body.doctorName,
        patientId: req.body.patientId,
        followUpId: null,
        symptoms: req.body.symptoms,
        results: indexArray,
        note: req.body.note
    }).then(async doc => {
		res.status(200).json({apptId: doc.id, indexArray});
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
                        startTime: doc.data().startTime,
                        endTime: doc.data().endTime,
                        time: doc.data().time,
                        doctorId: doc.data().doctorId,
                        doctorName: doc.data().doctorName,
                        patientId: doc.data().patientId,
                        followUpId: doc.data().followUpId,
                        symptoms: doc.data().symptoms,
                        results: doc.data().results,
                        note: doc.data().note
                    }
                )
            }
        });
        res.status(200).json(doctorsAppts)
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
                        time: doc.data().time,
                        doctorId: doc.data().doctorId,
                        doctorName: doc.data().doctorName,
                        patientId: doc.data().patientId,
                        followUpId: doc.data().followUpId,
                        symptoms: doc.data().symptoms,
                        results: doc.data().results,
                        note: doc.data().note,
                        startTime: doc.data().startTime,
                        endTime: doc.data().endTime,
                    }
                )
            }
        });
        res.status(200).json(patientsAppts)
    });
});


// add a followUpId to an existing appointment
// api/appointments/followUp/:id
router.put('/followUp/:id', (req, res) => {
    let apptId = req.params.id;
    let followUpId = req.body.followUpId;

    const apptRef = db.collection('appointments').doc(apptId);
    apptRef.update({
        followUpId: followUpId
    })
    .then(() => {
        console.log('Added follow-up Id');
		res.status(200).send('Added follow-up Id');
    })
    .catch(err => {
        console.log('Error adding follow-up Id');
		res.status(500).send('Error adding follow-up Id');
    })
});

// get appts for a certain date for certain doctor
// api/appointments/getForDay/:id
router.post('/getForDay/:id', async (req, res) => {
    let doctorId = req.params.id;
    let dateToReturn = req.body.data;

    console.log(doctorId)
    console.log(req.body)

    const appointmentsRef = db.collection('appointments');
    const snapshot = await appointmentsRef.where('doctorId', '==', doctorId).get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }

    const daysAppointments = [];
    snapshot.forEach(doc => {

        // this if statement might need altering
        if (doc.data().date == dateToReturn) {
            daysAppointments.push(doc.data().time)
        }
    });

    res.status(200).json(daysAppointments);
});



module.exports = router;
