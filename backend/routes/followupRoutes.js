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
});

// Add imgUrl to attachments
// api/followUps/imgUpload
router.put('/imgUpload', (req, res) => {
    let followUpId = req.body.followUpId;
    let imgUrl = req.body.imgUrl;

    let followUpRef = db.collection('followups').doc(followUpId);

    followUpRef.update({
        attachmentUrls: admin.firestore.FieldValue.arrayUnion(imgUrl)
    }).then(()=> {
		console.log('Successfully added imgUrl');
		res.status(200).send('Successfully added imgUrl');
	}).catch(() => {
		console.log('Failed to add imgUrl');
		res.status(500).send('Failed to add imgUrl');
	});
});

// Get a specific follow-up
// api/followups/:id
router.get('/:id', async (req, res) => {
    let followUpId = req.params.id;

    const followUpRef = db.collection('followups').doc(followUpId);
    const doc = await followUpRef.get();

    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
        res.status(200).json(doc.data());
    }
});

// Get all follow-ups of a doctor
// api/followups/forDoctor/:id
router.get('/forDoctor/:id', (req, res) => {
    let doctorId = req.params.id;

    db.collection('followups').get().then(snapshot => {
        let doctorsFollowups = [];

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            if (doc.data().doctorId == doctorId) {
                doctorsFollowups.push({
                    id: doc.id,
                    doctorId: doc.data().doctorId,
                    patientId: doc.data().patientId,
                    note: doc.data().note,
                    attachmentUrls: doc.data().attachmentUrls
                })
            }
        });

        res.status(200).json(doctorsFollowups)
    })
});

// Get all follow-ups of a patient
// api/followups/forPatient/:id
router.get('/forPatient/:id', (req, res) => {
    let patientId = req.params.id;

    db.collection('followups').get().then(snapshot => {
        let patientsFollowups = [];

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            if (doc.data().patientId == patientId) {
                patientsFollowups.push({
                    id: doc.id,
                    doctorId: doc.data().doctorId,
                    patientId: doc.data().patientId,
                    note: doc.data().note,
                    attachmentUrls: doc.data().attachmentUrls
                })
            }
        });

        res.status(200).json(patientsFollowups)
    })
});

// delete a followup
// api/followups/:id
router.delete('/:id', (req, res) => {
    return db.collection('followups').doc(req.params.id).delete()
    .then(followup => {
        res.status(200).json({
            message: 'Follow-up Deleted.'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Follow-up not found");
    });
})


module.exports = router;