const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// Create a follow-up
// api/followups/
router.post('/', (req, res) => {
    db.collection('followups').add({
        note:  req.body.note,
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
        attachmentUrls: []
    }).then(doc => {
		console.log('Added a followup document with ID: ' + doc.id);
		res.status(200).json({
            followUp: doc.id
        });
	}).catch(error => {
		console.log(error);
		res.status(500);
	});
})


module.exports = router;