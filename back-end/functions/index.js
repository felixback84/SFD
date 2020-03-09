// firebase
const functions = require('firebase-functions');
const { db } = require('./utilities/admin');
// express   
const app = require('express')();
// middleware for auth
const FBAuth = require('./utilities/fbAuth');
// cors
// const cors = require('cors');
// app.use(cors({ origin: true }));

// handlers
// users
const { 
    signup,  
    login,
    addTutorDetails,
    uploadTutorImage,
    getAuthenticatedTutor
} = require('./handlers/tutors');


// rest routes
// users
//signup tutors
app.post('/signup', signup);
//login tutors
app.post('/login', login);
//add tutor details
app.post('/tutor', FBAuth, addTutorDetails);
//post image of tutor
app.post('/tutor/image', FBAuth, uploadTutorImage);
//get all own tutor data (auth)
app.get('/tutor', FBAuth, getAuthenticatedTutor);

// expotrt functions
exports.api = functions.https.onRequest(app);





// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });
