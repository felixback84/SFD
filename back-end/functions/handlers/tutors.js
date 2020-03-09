// firebase
const { admin, db } = require('../utilities/admin');
const config = require('../utilities/config');
const firebase = require('firebase');
firebase.initializeApp(config);

// validate data
const { 
    validateSignupData, 
    validateLoginData, 
    reduceUserDetails 
} = require('../utilities/validation');

// signup
exports.signup = (req, res) => {
    const newTutor = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    // data validation before logic
    // const { valid, errors } = validateSignupData(newUser);
    // if(!valid) return res.status(400).json(errors);

    // default image of user profile
    const noImg = 'no-img.png';

    // db consult
    let token, tutorId;

    db 
        .doc(`/tutors/${newTutor.handle}`)
        .get()
        .then((doc) => {
            // check if the handle exists
            if(doc.exists){
                return res.status(400).json({handle: 'this handle is already taken'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newTutor.email, newTutor.password);
            }
        })
        .then((data) => {
            tutorId = data.user.uid;
            return data.user.getIdToken();
        })
        // db with user tutor credentials
        .then((idToken) => {
            token = idToken;
            const tutorCredentials = {
                handle: newTutor.handle,
                email: newTutor.email,
                createdAt: new Date().toISOString(),
                imgUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                tutorId
            };
            return db
                        .doc(`/tutors/${newTutor.handle}`)
                        .set(tutorCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.err(err);
            // check if the email exists
            if(err.code === 'auth/email-already-in-use'){
                return res.status(400).json({ email: 'Email is already in use' })
            } else {
                return res.status(500).json({ general: 'Something went wrong, please try again'})
            }
        });
}
