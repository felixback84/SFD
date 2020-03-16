// firebase
const { admin, db } = require('../utilities/admin');

// gat all adventures
exports.getAllAdventures = (req,res) => { 
    db
        .collection('adventures')
        //.orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let adventures = [];
            data.forEach((doc) => {
                adventures.push({
                    adventureId: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    imgUrl: doc.data().imgUrl,
                    createdAt: doc.data().createdAt,
                    price: doc.data().price,
                    duration: doc.data().duration,
                    tags: doc.data().tags,
                    language: doc.data().language,
                    audioUrl: doc.data().audioUrl,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount
                });
            });
            return res.json(adventures);
        })
        .catch((err) => console.error(err));
}

// get a specific adventure with it's comments and likes
exports.getAdventure = (req, res) => {
    let adventureData = {};
    db
        .doc(`/adventures/${req.params.adventureId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Adventure not found' });
            }
            adventureData = doc.data();
            adventureData.adventureId = doc.id;
            return db
                    .collection('comments')
                    //.orderBy('createdAt', 'desc')
                    .where('adventureId', '==', req.params.adventureId)
                    .get();
        })
        .then((data) => {
            adventureData.comments = [];
            data.forEach((doc) => {
                adventureData.comments.push(doc.data());
            });
            // return res.json(deviceData);
        })
    db
        .doc(`/adventures/${req.params.adventureId}`)
        .get()
        .then((doc) => {
            // if (!doc.exists) {
            //     return res.status(404).json({ error: 'Device not found' });
            // }
            adventureData = doc.data();
            adventureData.adventureId = doc.id;
            return db
                    .collection('likes')
                    //.orderBy('createdAt', 'desc')
                    .where('adventureId', '==', req.params.adventureId)
                    .get();
        })
        .then((data) => {
            adventureData.likes = [];
            data.forEach((doc) => {
                adventureData.likes.push(doc.data());
            })
            // all res of server
            return res.json(adventureData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// Post an adventure for an user
exports.postInUserAdventures = (req, res) => {
    const newUserAdventure = {
        deviceId: req.params.adventureId,
        userHandle: req.user.userHandle,
        createdAt: new Date().toISOString(),
        active: true 
    };

    db
        .collection(`userAdventures`)
        .add(newUserAdventure)
        .then((doc) => {
            const resUserAdventure = newUserAdventure;
            resUserAdventure.userAdventuresId = doc.id;
            res.json(resUserAdventure);
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        });
};

// post active adventure
exports.postInActiveUserAdventure = (req, res) => {
    db
        .doc(`/userAdventures/${req.params.userAdventuresId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'user adventure not found' });
            }
            return doc.ref.update({ active: true });
        })
        .then(() => {
            res.json({ message: 'Adventure active' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        }); 
}  

// post inactive adventure
exports.postInInactiveUserAdventure = (req, res) => {
    db
        .doc(`/userAdventures/${req.params.userAdventuresId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'user adventure not found' });
            }
            return doc.ref.update({ active: false });
        })
        .then(() => {
            res.json({ message: 'Adventure Inactive' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        }); 
} 

