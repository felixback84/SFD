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
    addUserDetails,
    uploadUserImage,
    getAuthenticatedUser
} = require('./handlers/users');

// devices
const { 
    getAllDevices,
    getDevice
} = require('./handlers/devices');

// adventures
const { 
    getAllAdventures,
    getAdventure
} = require('./handlers/adventures');

// rest routes
// users
//signup user
app.post('/signup', signup);
//login user
app.post('/login', login);
//add user details
app.post('/user', FBAuth, addUserDetails);
//post image of user
app.post('/user/image', FBAuth, uploadUserImage);
//get all own user data (auth)
//app.get('/user', FBAuth, getAuthenticatedUser);

// devices
// get all devices
app.get('/devices', getAllDevices);
// get one device:pub
app.get('/devices/:deviceId', getDevice);

// adventures
// get all adventures
app.get('/adventures', getAllAdventures);
// get one adventure:pub
app.get('/adventures/:adventureId', getAdventure);

// expotrt functions
exports.api = functions.https.onRequest(app);


