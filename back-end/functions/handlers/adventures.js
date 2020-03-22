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
     // object to save and send main data in collection userAdventure (header info)
    const newUserAdventure = {
        adventureId: req.params.adventureId,
        userHandle: req.user.userHandle,
        createdAt: new Date().toISOString(),
        active: false
    };

    // object to hold all info, newUserAdventure, adventureData
    let allUserAdventureData = {};
    allUserAdventureData = newUserAdventure;

    db
    .collection('userAdventures')
    .where('userHandle', '==', req.user.userHandle)
    .where('adventureId', '==', req.params.adventureId)
    .limit(1)
    .get()
    .then((data) => {
        if (!data.empty) {
            return res.status(404).json({ error: 'Adventure already yours' });
        } else {
            db
                .doc(`/adventures/${req.params.adventureId}`)
                .get()
                .then((doc) => {
                    // now save the select info of .doc (adventure) of the collection
                    let selectInfoAdventure = {
                        title: doc.data().title,
                        description: doc.data().description,
                        imageUrl: doc.data().imageUrl,
                        createdAt: doc.data().createdAt,
                        duration: doc.data().duration,
                        tags: doc.data().tags,
                        language: doc.data().language,
                        audioUrl: doc.data().audioUrl
                    } 
                    allUserAdventureData.adventure = selectInfoAdventure;
                    // write in global object
                    return db
                        .collection('userAdventures')
                        .add(allUserAdventureData) 
                
                })
                .then(() => {
                    return res.json(allUserAdventureData);
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
}    

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

// Like an adventure
exports.likeAdventure = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.userHandle)
        .where('adventureId', '==', req.params.adventureId)
        .limit(1);

    const adventureDocument = db.doc(`/adventures/${req.params.adventureId}`);
    let adventureData;
    adventureDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                adventureData = doc.data();
                adventureData.adventureId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Adventure not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                //console.log(data);
                return db
                    .collection('likes')
                    .add({
                        adventureId: req.params.adventureId,
                        userHandle: req.user.userHandle,
                        type: "adventures"
                    })
                    .then(() => {
                        adventureData.likesCount++;
                        return adventureDocument.update({ likesCount: adventureData.likesCount });
                    })
                    .then(() => {
                        //console.log(res);
                        //console.log(deviceData);
                        return res.json(adventureData);
                    });
            } else {
                return res.status(400).json({ error: 'Adventure already liked' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });         
};

// Unlike an adventure
exports.unlikeAdventure = (req, res) => { 
    const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.userHandle)
    .where('adventureId', '==', req.params.adventureId)
    .limit(1);

    const adventureDocument = db.doc(`/adventures/${req.params.adventureId}`);
    let adventureData;
    adventureDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                adventureData = doc.data();
                adventureData.adventureId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Adventure not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Adventure not liked' });
            } else {
                return db
                    .doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        adventureData.likesCount--;
                        return adventureDocument.update({ likesCount: adventureData.likesCount });
                    })
                    .then(() => {
                        res.json(adventureData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// Comment on an adventure
exports.postAdventureComment = (req, res) => {
    if (req.body.bodyComment.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });
    const newCommentAdventure = {
        bodyComment: req.body.bodyComment,
        createdAt: new Date().toISOString(),
        adventureId: req.params.adventureId,
        userHandle: req.user.userHandle,
        userImage: req.user.imgUrl,
        type: "adventures"
    };

    db
        .doc(`/adventures/${req.params.adventureId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Adventure not found' });
            }
            return doc.ref.update({ commentsCount: doc.data().commentsCount + 1 });
        }) 
        .then(() => {
            return db.collection('comments').add(newCommentAdventure);
        })
        .then(() => {
            res.json(newCommentAdventure);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
};

// get all favorite content
exports.getFavoritesUserAdventures = (req, res) => {
    db
        .collection('favoriteContent')
        .where('type', '==', 'adventures')
        //.orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let favoriteContentAdventures = [];
            data.forEach((doc) => {
                favoriteContentAdventures.push({
                    userHandle: doc.data().userHandle,
                    type: doc.data().type,
                    adventureId: doc.data().adventureId
                });
            });
            return res.json(favoriteContentAdventures);
        })
        .catch((err) => console.error(err));
}

// favorite adventure
exports.favoriteAdventure = (req, res) => {
    
};

// unfavorite an adventure
exports.unfavoriteAdventure = (req, res) => { 
    
}