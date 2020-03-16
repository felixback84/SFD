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
    getDevice,
    postInUserDevices,
    postInActiveUserDevice,
    postInInactiveUserDevice,
    likeDevice
} = require('./handlers/devices');

// adventures
const { 
    getAllAdventures,
    getAdventure,
    postInUserAdventures,
    postInActiveUserAdventure,
    postInInactiveUserAdventure
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
app.get('/user', FBAuth, getAuthenticatedUser);

// devices
// get all devices
app.get('/devices', getAllDevices);
// get one device:pub
app.get('/devices/:deviceId', getDevice);

// post a user device
app.post('/user/:deviceId/buy-device', FBAuth, postInUserDevices);
// post active device
app.post('/user/device/:userDevicesId/active', FBAuth, postInActiveUserDevice);
// post inactive device
app.post('/user/device/:userDevicesId/inactive', FBAuth, postInInactiveUserDevice);

// like for device
app.get('/device/:deviceId/like', FBAuth, likeDevice);

// adventures
// get all adventures
app.get('/adventures', getAllAdventures);
// get one adventure:pub
app.get('/adventures/:adventureId', getAdventure);
// post a user adventure
app.post('/user/:adventureId/buy-adventure', FBAuth, postInUserAdventures);
// post active adventure
app.post('/user/adventure/:userAdventuresId/active', FBAuth, postInActiveUserAdventure);
// post inactive adventure
app.post('/user/adventure/:userAdventuresId/inactive', FBAuth, postInInactiveUserAdventure);


// expotrt functions
exports.api = functions.https.onRequest(app);


