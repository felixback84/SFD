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

