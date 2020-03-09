let db = {

    // signup tutors
    // app.post('/signup', signup);

    // login tutors
    // app.post('/login', login);

    // add tutor details
    // app.post('/tutor', FBAuth, addTutorDetails);

    // post image of tutor
    // app.post('/tutor/image', FBAuth, uploadTutorImage);

    // get all own tutor data (auth)
    // app.get('/tutor', FBAuth, getAuthenticatedTutor);

    tutors: [
        {   
            tutorId: 'gj42hyyuo4m37k345k5dh83',
            typeOfRelation: ['madre', 'padre', 'hermano', 'otro'],
            names: 'Carlos Alberto',
            lastname: 'Talero Jaocme',
            email: 'carlos.talero.jacome@gmail.com',
            handle: 'CarlosTal84',
            password: 'ashed-string',
            phone: 573005256068,
            location: 'Lonodn, UK',
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            bio: 'Hello, my name is user, nice to meet you'
        }
    ],

    // add kid details
    // app.post('/kid', FBAuth, addKidDetails);

    // get kid data
    // app.get('/kid', FBAuth, getKidDetails);

    kids: [
        {   
            tutorId: 'gj42hyyuo4m37k345k5dh83',
            handle: 'CarlosTal84',
            kidId: 'dh23ggj5h32g543j5gf43',
            kidHandle: 'Camilin15',
            names: 'Camilo Alberto',
            lastname: 'Talero García',
            typeOfRelation: ['son', 'brother', 'other'],
            birthdate: '2015-09-06',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ],

    // get all kid adventures
    // app.get('/kid-adventures', FBAuth, getKidAdventures);

    // post buy kid adventure
    // app.post('/kid-adventures/:adventureId/buy', FBAuth, postBuyKidAdventure);

    // post active adventure
    // app.post('/kid-adventures/:adventureId/active', FBAuth, postActiveKidAdventure);
    
    // post favorite adventure
    // app.post('/kid-adventures/:adventureId/favorite', FBAuth, postFavoriteKidAdventure);

    // get all favorite adventures
    // app.get('/kid-adventures/favorites', FBAuth, getFavoritesKidAdventures);

    kidAdventures: [
        {   
            kidAdventuresId: 'FfHXu3DNdLZUzeaSIjaa',
            tutorHandle: 'CarlosTal84',
            kidHandle: 'Camili15',
            adventureId:'dmn23gtj5h62g563p5gf467',
            active: true,
            createdAt: '2019-03-15T10:59:52.798Z',
            favorite: true | false
        }
    ], 

    // get all kid devices
    // app.get('/kid-devices', FBAuth, getKidDevices);

    // post a kid device
    // app.post('/kid-devices', FBAuth, postKidDevices);

    // post buy kid devices
    // app.post('/kid-devices/:deviceId/buy', FBAuth, postBuyKidDevice);

    kidDevices: [
        {   
            kidDevicesId: 'vwUPg64eysTLaok4CVn4',
            deviceId: 'MZInC971tJYurv3OYzjR',
            tutorHandle: 'CarlosTal84',
            kidHandle: 'Camilin15',
            nameOfDevice: 'halo',
            active: true | false
        }
    ],

    // get all adventures
    // app.get('/adventures', getAllAdventures);

    // get one adventure:pub
    // app.get('/adventures/:adventureId', getOneAdventure);

    adventures: [
        {   
            adventureId: '3vvH32idn5cGF0BESWVl',
            title: 'Wild spaces adventures',
            description: 'hello from description of the dventure',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            createdAt: '2019-03-15T10:59:52.798Z',
            price: 19.99,
            duration: 60,
            tags: ['adventure', 'space'],
            language: ['english'], 
            audioUrl: 'audio/dsfsdkfghskdfgs/dgfdhfgdh',
            likesCount: 2,
            commentsCount: 3
        }
    ],

    // get all devices
    // app.get('/devices', getAllDevices);

    // get one device:pub
    // app.get('/device/:deviceId', getAllDevices);

    devices: [
        {
            deviceId: 'MZInC971tJYurv3OYzjR',
            nameOfDevice: 'halo',
            createdAt: '2019-03-15T10:59:52.798Z',
            price: 199.99,
            ageRate: '4 to 8 years',
            likesCount: 2,
            commentsCount: 3
        }
    ],

    // like for adventure
    // app.get('/adventure/:adventureId/like', FBAuth, likeAdventure);

    // unlike for adventure
    // app.get('/adventure/:adventureId/unlike', FBAuth, unlikeAdventure);

    likesForAdventures: [
        {
            tutorHandle: 'CarlosTal84',
            adventureId: '3vvH32idn5cGF0BESWVl'
        }
    ],

    // post comment in one adventure
    // app.post('/adveture/:adventureId/comment', FBAuth, commentOnAdventure);

    commentsForAdventures: [
        {
            tutorHandle: 'CarlosTal84',
            adventureId: '3vvH32idn5cGF0BESWVl',
            bodyComment: 'nice one mate!',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ],

    // like for device
    // app.get('/device/:deviceId/like', FBAuth, likeDevice);

    // unlike for device
    // app.get('/device/:deviceId/unlike', FBAuth, unlikeDevice);

    likesForDevices: [
        {
            tutorHandle: 'CarlosTal84',
            deviceId: 'MZInC971tJYurv3OYzjR'
        }
    ],

    // post comment in one device
    // app.post('/device/:deviceId/comment', FBAuth, commentOnDevice);

    commentsForDevices: [
        {
            tutorHandle: 'CarlosTal84',
            deviceId: 'dmn23gtj5h62g563p5gf467',
            bodyComment: 'nice one mate!',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ],

    // mark if the notifications was read 
    // app.post('/notifications', FBAuth, markNotificationsRead);

    notifications: [
        {
            read: true | false,
            type: 'adventures | devices',
            createdAt: '2019-03-15T10:59:52.798Z',
            sendTo: 'CarlosTal84',
            kidAdventuresId: null,
            kidDevicesId: 'vwUPg64eysTLaok4CVn4' 
        }
    ]
}