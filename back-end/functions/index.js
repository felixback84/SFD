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
    postDataCheckOutDevice,
    getActiveUserDevices,
    getInactiveUserDevices,
    likeDevice,
    unlikeDevice,
    postDeviceComment,
    postInDataSetsUserDevice,
    getAllDataSetsUserDevice,
    getDataSetUserDevice
} = require('./handlers/devices');

// adventures
const { 
    getAllAdventures,
    getAdventure,
    postInUserAdventures,
    postDataCheckOutAdventure,
    getActiveUserAdventures,
    getInactiveUserAdventures,
    likeAdventure,
    unlikeAdventure,
    postAdventureComment,
    getFavoritesUserAdventures,
    favoriteAdventure,
    unfavoriteAdventure
} = require('./handlers/adventures');

///////////////// API REST ROUTES //////////////
// USERS
// signup user
app.post('/signup', signup);
// login user
app.post('/login', login);
// add user details
app.post('/user', FBAuth, addUserDetails);
// post image of user
app.post('/user/image', FBAuth, uploadUserImage);
// get all own user data (auth)
app.get('/user', FBAuth, getAuthenticatedUser);

// DEVICES
// get all devices
app.get('/devices', getAllDevices);
// get one device:pub
app.get('/devices/:deviceId', getDevice);
// post a user device
app.post('/user/:deviceId/buy-device', FBAuth, postInUserDevices);
// get userDevice *** with auth user
//// yaaaa

// post data for checkout to after post in userDevices
app.post('/user/checkout/device/:deviceId',FBAuth, postDataCheckOutDevice)

// post dataSets in user device
app.post('/user/device/:userDevicesId/dataset', FBAuth, postInDataSetsUserDevice);
// get all dataSets in user device 
app.get('/user/device/:userDevicesId/datasets', FBAuth, getAllDataSetsUserDevice);
// get one dataSets in user device
app.get('/user/device/:userDevicesId/dataset/:dataSetsId', FBAuth, getDataSetUserDevice);

// // post active device - sirve pero debe ser como los likes
// app.post('/user/device/:userDevicesId/active', FBAuth, postInActiveUserDevice);
// // post inactive device - sirve pero debe ser como los likes
// app.post('/user/device/:userDevicesId/inactive', FBAuth, postInInactiveUserDevice);

// get active userDevices 
app.get('/userdevices/:userDevicesId/active', FBAuth, getActiveUserDevices);
// get inactive userAdventures 
app.get('/userdevices/:userDevicesId/inactive', FBAuth, getInactiveUserDevices);

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
// get userAdventure *** with auth user
///// yaaa

// post data for checkout to after post in userAdventures
app.post('/user/checkout/adventures/:adventureId',FBAuth, postDataCheckOutAdventure)

// post active adventure - sirve pero debe ser como los likes
// app.post('/user/adventure/:userAdventuresId/active', FBAuth, postInActiveUserAdventure);
// post inactive adventure - sirve pero debe ser como los likes
// app.post('/user/adventure/:userAdventuresId/inactive', FBAuth, postInInactiveUserAdventure);

// get active userAdventures 
app.get('/useradventures/:userAdventuresId/active', FBAuth, getActiveUserAdventures);
// get inactive userAdventures 
app.get('/useradventures/:userAdventuresId/inactive', FBAuth, getInactiveUserAdventures);

// likes
app.get('/adventure/:adventureId/like', FBAuth, likeAdventure);
// unlikes
app.get('/adventure/:adventureId/unlike', FBAuth, unlikeAdventure); 

// comment on an adventure
app.post('/adventure/:adventureId/comment', FBAuth, postAdventureComment);

// not yet
// get all favorite adventures - sirve pero nop
app.get('/favorite-content/adventures', FBAuth, getFavoritesUserAdventures);

// favorites - nop
app.get('/adventure/:adventureId/favorite', FBAuth, favoriteAdventure);
// unfavorites - nop
app.get('/adventure/:adventureId/unfavorite', FBAuth, unfavoriteAdventure);

// expotrt functions
exports.api = functions.https.onRequest(app);

// NOTIFICATIONS FOR DB WITH SOME ACTIONS IN DB
// after creation of checkout 'devices'
exports.createNotificationOnLike = 
    functions.firestore.document('checkouts/{id}').where('type','==','device')
        .onCreate((snapshot) => {

        let snapShotDeviceID = snapshot.data().device.deviceId;

            const newUserDevice = {
                deviceId: snapShotDeviceID,
                userHandle: req.user.userHandle,
                createdAt: new Date().toISOString(),
                active: false
            };

            // object to hold all info, newUserDevice, deviceData
            let allUserDeviceData = {};
            allUserDeviceData = newUserDevice;

            db
            .collection('userDevices')
            .where('userHandle', '==', req.user.userHandle)
            .where('deviceId', '==', snapShotDeviceID)
            .limit(1)
            .get()
            .then((data) => {
                if (!data.empty) {
                    return res.status(404).json({ error: 'Device already yours' });
                } else {
                    
                    db
                        .doc(`/devices/${req.params.snapShotDeviceID}`)
                        .get()
                        .then((doc) => {
                            // now save the select info of .doc (device) of the collection
                            let selectInfoDevice = {
                                nameOfDevice: doc.data().nameOfDevice,
                                createdAt: doc.data().createdAt,
                                ageRate: doc.data().ageRate,
                                dataSets: doc.data().dataSets
                            };
                            allUserDeviceData.device = selectInfoDevice;
                            // write in global object
                            return db
                            .collection('userDevices')
                            .add(allUserDeviceData)  
                        })
                        .then(() => {
                            return res.json(allUserDeviceData);
                        }) 
                        // .catch((err) => {
                        //     console.error(err);
                        //     res.status(500).json({ error: err.code });
                        // });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
        })