const { admin, db } = require('../utilities/admin');

module.exports = (args) => (req, res) => {
    
    db
        .doc(`/${nameOfCollection}/${req.params.docId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Adventure not found' });
            }
            adventureData = doc.data();
            adventureData.docId = doc.id;
            return db
                    .collection(nameOfCollectionTo)
                    //.orderBy('createdAt', 'desc')
                    .where(nameDocId, '==', req.params.docId)
                    .get();
        })
        .then((data) => {
            adventureData.object = [];
            data.forEach((doc) => {
                adventureData.object.push(doc.data());
            });
            // return res.json(deviceData);
        })
    
}