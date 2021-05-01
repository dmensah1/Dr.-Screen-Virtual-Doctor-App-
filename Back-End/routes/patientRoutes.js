const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();


// Create a new patient
// /api/patients/
router.post('/', (req, res) => {
    const patientData = {
        id: req.body.id,
        email: req.body.email,
        fullName: req.body.fullName,
        birthday: req.body.birthday,
        isDoctor: req.body.isDoctor,
        doctorId: req.body.doctorId
    }

    return db.collection('patients').doc(patientData.id).set(patientData)
    .then(() => {
        console.log('New Patient Created')
        res.status(200).json({
            message: 'Created Successfully.'
        })
    })
    .catch((err) => console.log(err))
});

// Get a user by id
// /api/users/id
router.get('/:id' , (req, res) => {
    return db.collection('patients').doc(req.params.id).get()
        .then(user => {
            res.status(200).json({
                user: user.data()
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("User not found");
        });
});

// GET ALL PROFILES
router.get('/', (req, res) => {
	db.collection('patients').get().then(snapshot =>{
        let profiles = [];
		snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            profiles.push(
                {
                    id: doc.id,
                    fullName: doc.data().fullName,
                    email: doc.data.email,
                    birthday: doc.data().birthday,
                    isDoctor: doc.data().isDoctor,
                    doctorId: doc.data().doctorId
                }
            )
        });
        
		res.status(200).json({
			fetchedProfiles: profiles,
		});
	});
});


module.exports = router;