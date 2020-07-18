const express = require('express');
const router = express.Router();
const firebase = require('firebase');

const fb = require('./../../utils/firebase');

// Enable CORS.
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.post('/:latitude/:longitude', async (req, res, next) => {

  // Parse input from req.params.
  let latitude = parseFloat(req.params.latitude);
  let longitude = parseFloat(req.params.longitude);

  let promise = new Promise(resolve => {
    // Add tumbleweed to firestore.
    fb.getFirestore(db => {
      db.collection('tumbleweeds').add({
        location: new firebase.firestore.GeoPoint(latitude, longitude)
      });
      // Finished.
      resolve();
    });
  });

  await promise.then(() => {
    return res.status(200).json({ result: 'Tumbleweed added successfully' });
  });
});

module.exports = router;
