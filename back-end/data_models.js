let db = {

    // signup users ***
    // app.post('/signup', signup);

    // login users ***
    // app.post('/login', login);

    // add user details **
    // app.post('/user', FBAuth, addUserDetails);

    // post image of user ***
    // app.post('/user/image', FBAuth, uploadUserImage);

    // get all own user data (auth) ***
    // app.get('/user', FBAuth, getAuthenticatedUser);

    users: [
        {   
            userId: 'gj42hyyuo4m37k345k5dh83',
            names: 'Carlos Alberto',
            lastname: 'Talero Jaocme',
            email: 'carlos.talero.jacome@gmail.com',
            userhandle: 'CarlosTal84',
            phone: 573005256068,
            location: 'London, UK',
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            bio: 'Hello, my name is user, nice to meet you'
        }
    ], 

    // get all user adventures ***
    // app.get('/user-adventures', FBAuth, getUserAdventures); or 
    // app.get('/user', FBAuth, getAuthenticatedUser); ***

    // post a user adventure ***
    // app.post('/user-adventures', FBAuth, postUserAdventure); or 
    // app.post('/user/:adventureId/buy-adventure', FBAuth, postInUserAdventures); ***

    // post active adventure ***
    // app.post('/user-adventures/:adventureId/active', FBAuth, postActiveUserAdventure); or 
    // app.post('/user/adventure/:userAdventuresId/active', FBAuth, postActiveUserAdventure); ***

    // post inactive adventure ***
    // app.post('/user/adventure/:userAdventuresId/inactive', FBAuth, postInInactiveUserAdventure);

    userAdventures: [
        {   
            userAdventuresId: 'FfHXu3DNdLZUzeaSIjaa',
            userHandle: 'CarlosTal84',
            adventureId:'dmn23gtj5h62g563p5gf467',
            createdAt: '2019-03-15T10:59:52.798Z',
            active: true | false
        }
    ], 

    // get all user devices ***
    // app.get('/user-devices', FBAuth, getUserDevices); or
    // app.get('/user', FBAuth, getAuthenticatedUser); ***

    // post a user device ***
    // app.post('/user-devices', FBAuth, postUserDevices); or 
    // app.post('/user/:deviceId/buy-device', FBAuth, postInUserDevices); ***

    // post active device ***
    // app.post('/user-device/:deviceId/active', FBAuth, postActiveUserDevice); or
    // app.post('/user/device/:userDevicesId/active', FBAuth, postActiveUserDevice); ***

    // post inactive device ***
    // app.post('/user/device/:userDevicesId/inactive', FBAuth, postInInactiveUserDevice);

    userDevices: [
        {   
            userDevicesId: 'vwUPg64eysTLaok4CVn4',
            deviceId: 'MZInC971tJYurv3OYzjR',
            userHandle: 'CarlosTal84',
            createdAt: '2019-03-15T10:59:52.798Z',
            active: true | false
        }
    ],

    // get all adventures ***
    // app.get('/adventures', getAllAdventures);

    // get one adventure:pub ***
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

    // get all devices ***
    // app.get('/devices', getAllDevices);

    // get one device:pub ***
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

    // likes ***
    // app.get('/adventure/:adventureId/like', FBAuth, like); ***
    // app.get('/device/:deviceId/like', FBAuth, like); ***

    // unlikes ***
    // app.get('/adventure/:adventureId/unlike', FBAuth, unlike); ***
    // app.get('/device/:deviceId/unlike', FBAuth, unlike); ***

    likes: [
        {
            userhandle: 'CarlosTal84',
            deviceId: 'MZInC971tJYurv3OYzjR',
            adventureId: null,
            type: 'adventures | devices'
        }
    ],

    // post comments ***
    // app.post('/adventure/:adventureId/comment', FBAuth, postAdventureComment); ***
    // app.post('/device/:deviceId/comment', FBAuth, postDeviceComment); ***

    comments: [
        {
            userhandle: 'CarlosTal84',
            deviceId: 'MZInC971tJYurv3OYzjR',
            adventureId: null,
            bodyComment: 'nice one mate!',
            createdAt: '2019-03-15T10:59:52.798Z',
            type: 'adventures | devices'
        }
    ],

    // favorites
    // app.get('/adventure/:adventureId/favorite', FBAuth, getFavoriteUserAdventure);

    // unfavorites
    // app.get('/adventure/:adventureId/unfavorite', FBAuth, getUnFavoriteUserAdventure);   

    // get all favorite adventures to make a list
    // app.get('/favorite-content/adventures', FBAuth, getFavoritesUserAdventures);***

    favoriteContent: [
        {
            userHandle: 'CarlosTal84',
            adventureId: '3vvH32idn5cGF0BESWVl',
            type: 'adventures'
        }
    ],

    // mark if the notifications was read 
    // app.post('/notifications', FBAuth, markNotificationsRead);

    notifications: [
        {
            read: true | false,
            type: 'adventures | devices',
            createdAt: '2019-03-15T10:59:52.798Z',
            sendToUserHandle: 'CarlosTal84',
            userAdventuresId: null,
            userDevicesId: 'vwUPg64eysTLaok4CVn4' 
        }
    ]
}