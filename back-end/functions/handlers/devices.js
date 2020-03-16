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
                    createdAt: doc.data().createdAt,
                    price: doc.data().price,
                    ageRate: doc.data().ageRate,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount
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
    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            // if (!doc.exists) {
            //     return res.status(404).json({ error: 'Device not found' });
            // }
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

// Post a device for an user
exports.postInUserDevices = (req, res) => {
    const newUserDevice = {
        deviceId: req.params.deviceId,
        userHandle: req.user.userHandle,
        createdAt: new Date().toISOString(),
        active: true 
    };

    db
        .collection(`userDevices`)
        .add(newUserDevice)
        .then((doc) => {
            const resUserDevice = newUserDevice;
            resUserDevice.userDevicesId = doc.id;
            res.json(resUserDevice);
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        });
};

// post active device
exports.postInActiveUserDevice = (req, res) => {
    db
        .doc(`/userDevices/${req.params.userDevicesId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'user device not found' });
            }
            return doc.ref.update({ active: true });
        })
        .then(() => {
            res.json({ message: 'Device active' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        }); 
}  

// post inactive device
exports.postInInactiveUserDevice = (req, res) => {
    db
        .doc(`/userDevices/${req.params.userDevicesId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'user device not found' });
            }
            return doc.ref.update({ active: false });
        })
        .then(() => {
            res.json({ message: 'Device Inactive' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        }); 
}  

// Like a scream
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
                        //console.log(res);
                        //console.log(deviceData);
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

