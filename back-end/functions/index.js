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
    likeDevice,
    unlikeDevice,
    postDeviceComment
} = require('./handlers/devices');

// adventures
const { 
    getAllAdventures,
    getAdventure,
    postInUserAdventures,
    postInActiveUserAdventure,
    postInInactiveUserAdventure,
    likeAdventure,
    unlikeAdventure,
    postAdventureComment,
    getFavoritesUserAdventures,
    favoriteAdventure,
    unfavoriteAdventure
} = require('./handlers/adventures');

///////////////// API REST ROUTES //////////////
// USERS
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

// DEVICES
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
// unlike for device
app.get('/device/:deviceId/unlike', FBAuth, unlikeDevice);

// comment on device
app.post('/device/:deviceId/comment', FBAuth, postDeviceComment);

// ADVENTURES
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

// likes
app.get('/adventure/:adventureId/like', FBAuth, likeAdventure);
// unlikes
app.get('/adventure/:adventureId/unlike', FBAuth, unlikeAdventure); 

// comment on an adventure
app.post('/adventure/:adventureId/comment', FBAuth, postAdventureComment);

// get all favorite adventures
app.get('/favorite-content/adventures', FBAuth, getFavoritesUserAdventures);

// favorites
app.get('/adventure/:adventureId/favorite', FBAuth, favoriteAdventure);
// unfavorites
app.get('/adventure/:adventureId/unfavorite', FBAuth, unfavoriteAdventure);


// expotrt functions
exports.api = functions.https.onRequest(app);


