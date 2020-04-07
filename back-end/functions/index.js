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
// get all own user data (auth) - to check
app.get('/user', FBAuth, getAuthenticatedUser);

////////////////////////////////////////////////// DEVICES ////////////////////////////////////////////////////////
// get all devices
app.get('/devices', getAllDevices);
// get one device:pub
app.get('/devices/:deviceId', getDevice);
// post a user device - without use
app.post('/user/:deviceId/buy-device', FBAuth, postInUserDevices);
// get userDevice *** with auth user
//// yaaaa

// post data for checkout 
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

// get active userDevices - to check
app.get('/userdevices/:userDevicesId/active', FBAuth, getActiveUserDevices);
// get inactive userAdventures - to check
app.get('/userdevices/:userDevicesId/inactive', FBAuth, getInactiveUserDevices);

// like for device
app.get('/device/:deviceId/like', FBAuth, likeDevice);
// unlike for device
app.get('/device/:deviceId/unlike', FBAuth, unlikeDevice);

// comment on device
app.post('/device/:deviceId/comment', FBAuth, postDeviceComment);

////////////////////////////////////////// ADVENTURES ///////////////////////////////////////////////////
// get all adventures
app.get('/adventures', getAllAdventures);
// get one adventure:pub
app.get('/adventures/:adventureId', getAdventure);

// post a user adventure - without use
app.post('/user/:adventureId/buy-adventure', FBAuth, postInUserAdventures);
// get userAdventure *** with auth user
///// yaaa

// post data for checkout 
app.post('/user/checkout/adventure/:adventureId',FBAuth, postDataCheckOutAdventure)

// // post active adventure - sirve pero debe ser como los likes
// app.post('/user/adventure/:userAdventuresId/active', FBAuth, postInActiveUserAdventure);
// // post inactive adventure - sirve pero debe ser como los likes
// app.post('/user/adventure/:userAdventuresId/inactive', FBAuth, postInInactiveUserAdventure);

// get active userAdventures - to check
app.get('/useradventures/:userAdventuresId/active', FBAuth, getActiveUserAdventures);
// get inactive userAdventures - to check
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

// export functions
exports.api = functions.https.onRequest(app);

///////////////////////////////// SOME ACTIONS IN DB WITHOUT REQUEST ////////////////////////////////
// after creation of checkout 
exports.createUserPropertyAfterCheckout = functions.firestore
    .document('checkouts/{checkoutsId}')
    .onCreate((snap) => {
        // Get an object representing the document
        const newCheckout = snap.data();
        // access a particular field as you would any JS property
        const type = newCheckout.type;
        // perform desired operations ...
        if(type == 'device'){
            let snapShotDeviceId = newCheckout.device.deviceId;
            let snapShotUserHandle =  newCheckout.userHandle;

            const newUserDevice = {
                deviceId: snapShotDeviceId,
                userHandle: snapShotUserHandle,
                createdAt: new Date().toISOString(),
                active: false
            };

            // object to hold all info, newUserDevice, deviceData
            let allUserDeviceData = {};
            allUserDeviceData = newUserDevice;
            // ask if exists for userDevices data
            db
            .collection('userDevices')
            .where('userHandle', '==', snapShotUserHandle)
            .where('deviceId', '==', snapShotDeviceId)
            .limit(1)
            .get()
            .then((data) => {
                if (!data.empty) {
                    console.log('Device already yours');
                } else {
                    db
                        .doc(`/devices/${snapShotDeviceId}`)
                        .get()
                        .then((doc) => {
                            // now save the select info of .doc (device) of the collection
                            let selectInfoDevice = {
                                nameOfDevice: doc.data().nameOfDevice,
                                imgUrl: doc.data().imgUrl,
                                videoUrl: doc.data().videoUrl,
                                badgeUrl: doc.data().badgeUrl,
                                createdAt: doc.data().createdAt,
                                ageRate: doc.data().ageRate,
                                howManyAdventures: doc.data().howManyAdventures,
                                dataSets: doc.data().dataSets
                            };
                            allUserDeviceData.device = selectInfoDevice;
                            // write in global object
                            return db
                            .collection('userDevices')
                            .add(allUserDeviceData) 
                        })
                }
            })
            .catch((err) => console.error(err));

        } else if (type == 'adventure') {
            let snapShotAdventureId = newCheckout.adventure.adventureId;
            let snapShotUserHandle =  newCheckout.userHandle;

            const newUserAdventure = {
                adventureId: snapShotAdventureId,
                userHandle: snapShotUserHandle,
                createdAt: new Date().toISOString(),
                active: false
            };

            // object to hold all info, newUserDevice, deviceData
            let allUserAdventureData = {};
            allUserAdventureData = newUserAdventure;

            db
            .collection('userAdventures')
            .where('userHandle', '==', snapShotUserHandle)
            .where('adventureId', '==', snapShotAdventureId)
            .limit(1)
            .get()
            .then((data) => {
                if (!data.empty) {
                    console.log('Adventure already yours');
                } else {
                    db
                        .doc(`/adventures/${snapShotAdventureId}`)
                        .get()
                        .then((doc) => {
                            // now save the select info of .doc (device) of the collection
                            let selectInfoAdventure = {
                                title: doc.data().title,
                                description: doc.data().description,
                                imgUrl: doc.data().imgUrl,
                                videoUrl: doc.data().videoUrl,
                                createdAt: doc.data().createdAt,
                                duration: doc.data().duration,
                                tags: doc.data().tags,
                                language: doc.data().language,
                                audioUrl: doc.data().audioUrl,
                                device: {
                                    nameOfDevice: doc.data().device.nameOfDevice,
                                    badgeUrl: doc.data().device.badgeUrl
                                }
                            }
                            allUserAdventureData.adventure = selectInfoAdventure;
                            // write in global object
                            return db
                                .collection('userAdventures')
                                .add(allUserAdventureData)   
                        })
                }
            })
            .catch((err) => console.error(err));
        } else {
            console.log('error from inscription')
        }
});

