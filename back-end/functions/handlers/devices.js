// firebase
const { admin, db } = require('../utilities/admin');

// gat all devices
exports.getAllDevices = (req,res) => { 
    db
        .collection('devices')
        //.orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let devices = [];
            data.forEach((doc) => {
                devices.push({
                    deviceId: doc.id,
                    nameOfDevice: doc.data().nameOfDevice,
                    imgUrl: doc.data().imgUrl,
                    videoUrl: doc.data().vieoUrl,
                    badgeUrl: doc.data().badgeUrl,
                    createdAt: doc.data().createdAt,
                    price: doc.data().price,
                    ageRate: doc.data().ageRate,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    howManyAdventures: doc.data().howManyAdventures
                });
            });
            return res.json(devices);
        })
        .catch((err) => console.error(err));
}

// get a specific device with it's comments and likes
exports.getDevice = (req, res) => {
    let deviceData = {};
    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Device not found' });
            }
            deviceData = doc.data();
            deviceData.deviceId = doc.id;
            return db
                    .collection('comments')
                    //.orderBy('createdAt', 'desc')
                    .where('deviceId', '==', req.params.deviceId)
                    .get();
        })
        .then((data) => {
            deviceData.comments = [];
            data.forEach((doc) => {
                deviceData.comments.push(doc.data());
            });
            // return res.json(deviceData);
        })
    // ask for likes    
    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            deviceData = doc.data();
            deviceData.deviceId = doc.id;
            return db
                    .collection('likes')
                    //.orderBy('createdAt', 'desc')
                    .where('deviceId', '==', req.params.deviceId)
                    .get();
        })
        .then((data) => {
            deviceData.likes = [];
            data.forEach((doc) => {
                deviceData.likes.push(doc.data());
            })
            // all res of server
            return res.json(deviceData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// Post a device for an user - without use
exports.postInUserDevices = (req, res) => {
    const newUserDevice = {
        deviceId: req.params.deviceId,
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
        .where('deviceId', '==', req.params.deviceId)
        .limit(1)
        .get()
        .then((data) => {
            if (!data.empty) {
                return res.status(404).json({ error: 'Device already yours' });
            } else {
                
                db
                    .doc(`/devices/${req.params.deviceId}`)
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
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: err.code });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// post data for checkout to post in userDevices 
exports.postDataCheckOutDevice = (req, res) => {

    // global var
    let dataCheckout = {};

    // put addiotional info for checkout
    let checkoutData = {
        userHandle: req.user.userHandle,
        createdAt: new Date().toISOString(),
        type: 'device',
        state:'pending'
    }
    dataCheckout = checkoutData;
    
    // address
    const newUserAdressToDelivery = {
        city: req.body.city,
        addressToDelivery: req.body.addressToDelivery,
        plastic: req.body.plastic
    };

    // add address to global var
    dataCheckout.address = newUserAdressToDelivery;
    // ask for user data
    db
        .doc(`/users/${req.user.userHandle}`)
        .get()
        .then((doc) => {
            let userDataFilter = {
                names: doc.data().names,
                lastname: doc.data().lastname,
                email: doc.data().email
            }
            dataCheckout.user = userDataFilter;
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
    // ask for device info
    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            let deviceDataFilter = {
                deviceId: req.params.deviceId,
                nameOfDevice: doc.data().nameOfDevice,
                price: doc.data().price
            };
                dataCheckout.device = deviceDataFilter;
                console.log(dataCheckout);
                // add final object in db
                db.collection('checkouts').add(dataCheckout);
                // send response from server
                return res.json('done with the checkout');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// post in dataSets in user devices
exports.postInDataSetsUserDevice = (req, res) => {
    const dataSet = {   
        on: req.body.on,
        connected: req.body.connected,
        createdAt: new Date().toISOString(),
        tail: {
            proximity: req.body.tail.proximity,
            temperature: req.body.tail.temperature,
            pressure: req.body.tail.pressure,
            motion: req.body.tail.motion,
            position: {
                x: req.body.tail.position.x,
                y: req.body.tail.position.y,
                z: req.body.tail.position.z
            }
        },
        midi: {
            color: req.body.midi.color,
            speakers: req.body.midi.speakers,
            mic: req.body.midi.mic,
            lights: req.body.midi.lights,
            vibration: req.body.midi.vibration
        }
    }

    db
        .doc(`/userDevices/${req.params.userDevicesId}`)
        .collection('dataSets')
        .add(dataSet)
        .then(() => {
            return res.json(dataSet);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get all dataSets in user device 
exports.getAllDataSetsUserDevice = (req, res) => {
    db
        .doc(`/userDevices/${req.params.userDevicesId}`)
        .collection('dataSets')
        .get()
        .then((data) => {
            let dataSets = [];
            data.forEach((doc) => {
                dataSets.push({
                    dataSetsId: doc.id,
                    on: doc.data().on,
                    connected: doc.data().connected,
                    createdAt: new Date().toISOString(),
                    tail: {
                        proximity: doc.data().tail.proximity,
                        temperature: doc.data().tail.temperature,
                        pressure: doc.data().tail.pressure,
                        motion: doc.data().tail.motion,
                        position: {
                            x: doc.data().tail.position.x,
                            y: doc.data().tail.position.y,
                            z: doc.data().tail.position.z
                        }
                    },
                    midi: {
                        color: doc.data().midi.color,
                        speakers: doc.data().midi.speakers,
                        mic: doc.data().midi.mic,
                        lights: doc.data().midi.lights,
                        vibration: doc.data().midi.vibration
                    }
                });
            });
            return res.json(dataSets);
        })
        .catch((err) => console.error(err));   
}

// get one dataSets in user device
exports.getDataSetUserDevice = (req, res) => {
    
    let messageRef = db
        .collection('userDevices')
        .doc(req.params.userDevicesId)
        .collection('dataSets')
        .doc(req.params.dataSetsId)
        .get()
        .then((doc) => {
            let dataSet = doc.data();
            console.log(dataSet);
            return res.json(dataSet);
        })
        .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
        });
}

// post active device
exports.postInActiveUserDevice = (req, res) => {
    // db
    //     .doc(`/userDevices/${req.params.userDevicesId}`)
    //     .get()
    //     .then((doc) => {
    //         if (!doc.exists) {
    //             return res.status(404).json({ error: 'user device not found' });
    //         }
    //         return doc.ref.update({ active: true });
    //     })
    //     .then(() => {
    //         res.json({ message: 'Device active' });
    //     })
    //     .catch((err) => {
    //         res.status(500).json({ error: 'something went wrong' });
    //         console.error(err);
    //     }); 
}  

// get active device
exports.getActiveUserDevices = (req, res) => {
    const activeUserDeviceDocument = db
        .collection('activeUserDevices')
        .where('userHandle', '==', req.user.userHandle)
        .where('userDevicesId', '==', req.params.userDevicesId)
        .limit(1);

    // ask for device
    const userDeviceDocument = db.doc(`/userDevices/${req.params.userDevicesId}`); 
    // global var to hold all data
    let userDeviceData;
    // ask if exists this device
    userDeviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                userDeviceData = doc.data();
                userDeviceData.userDevicesId = doc.id;
                return activeUserDeviceDocument.get();
            } else {
                return res.status(404).json({ error: 'userDevice not found' });
            }
        })
        // check if is empty this kind of item in the activeDevices collection
        .then((data) => {
            if (data.empty) {
              //console.log(data);
                return db
                    // add data to it
                    .collection('activeUserDevices')
                    .add({
                        userDevicesId: req.params.userDevicesId,
                        userHandle: req.user.userHandle
                    })
                    .then(() => {
                        return userDeviceDocument.update({ active: true });
                    })
                    // data in response to check in front if the likes exists
                    .then(() => {
                        //console.log(res);
                        console.log(userDeviceData);
                        return res.json(userDeviceData);
                    
                    });
            } else {
                return res.status(400).json({ error: 'userDevice already active' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// post inactive device
exports.postInInactiveUserDevice = (req, res) => {
    // db
    //     .doc(`/userDevices/${req.params.userDevicesId}`)
    //     .get()
    //     .then((doc) => {
    //         if (!doc.exists) {
    //             return res.status(404).json({ error: 'user device not found' });
    //         }
    //         return doc.ref.update({ active: false });
    //     })
    //     .then(() => {
    //         res.json({ message: 'Device Inactive' });
    //     })
    //     .catch((err) => {
    //         res.status(500).json({ error: 'something went wrong' });
    //         console.error(err);
    //     }); 
}  

// get inactive device
exports.getInactiveUserDevices = (req, res) => {
    const activeUserDeviceDocument = db
            .collection('activeUserDevices')
            .where('userHandle', '==', req.user.userHandle)
            .where('userDevicesId', '==', req.params.userDevicesId)
            .limit(1);

    const userDeviceDocument = db.doc(`/userDevices/${req.params.userDevicesId}`);
    let userDeviceData;
    
    userDeviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                userDeviceData = doc.data();
                userDeviceData.userDevicesId = doc.id;
                return activeUserDeviceDocument.get();
            } else {
                return res.status(404).json({ error: 'userDevice not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Device not active' });
            } else {
                return db
                    .doc(`/activeUserDevices/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        return userDeviceDocument.update({ active: false });
                    })
                    .then(() => {
                        res.json(userDeviceData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// Like a device
exports.likeDevice = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.userHandle)
        .where('deviceId', '==', req.params.deviceId)
        .limit(1);

    const deviceDocument = db.doc(`/devices/${req.params.deviceId}`);
    let deviceData;
    deviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                deviceData = doc.data();
                deviceData.deviceId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Device not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                //console.log(data);
                return db
                    .collection('likes')
                    .add({
                        deviceId: req.params.deviceId,
                        userHandle: req.user.userHandle,
                        type: "devices"
                    })
                    .then(() => {
                        deviceData.likesCount++;
                        return deviceDocument.update({ likesCount: deviceData.likesCount });
                    })
                    .then(() => {
                        return res.json(deviceData);
                    });
            } else {
                return res.status(400).json({ error: 'Device already liked' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });         
};

// Unlike a device
exports.unlikeDevice = (req, res) => { 
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.userHandle)
        .where('deviceId', '==', req.params.deviceId)
        .limit(1);

    const deviceDocument = db.doc(`/devices/${req.params.deviceId}`);
    let deviceData;
    deviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                deviceData = doc.data();
                deviceData.deviceId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Device not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Device not liked' });
            } else {
                return db
                    .doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        deviceData.likesCount--;
                        return deviceDocument.update({ likesCount: deviceData.likesCount });
                    })
                    .then(() => {
                        res.json(deviceData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// Comment on a device
exports.postDeviceComment = (req, res) => {
    if (req.body.bodyComment.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });
    const newCommentDevice = {
        bodyComment: req.body.bodyComment,
        createdAt: new Date().toISOString(),
        deviceId: req.params.deviceId,
        userHandle: req.user.userHandle,
        userImage: req.user.imgUrl,
        type: "devices"
    };

    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Device not found' });
            }
            return doc.ref.update({ commentsCount: doc.data().commentsCount + 1 });
        }) 
        .then(() => {
            return db.collection('comments').add(newCommentDevice);
        })
        .then(() => {
            res.json(newCommentDevice);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
};