let db = {

    // signup tutors
    // app.post('/signup', signup);

    // login tutors
    // app.post('/login', login);

    // add tutor details
    // app.post('/tutor', FBAuth, addTutorDetails);

    // post image of tutor
    //app.post('/tutor/image', FBAuth, uploadImage);

    // get all own tutor data (auth)
    // app.get('/tutor', FBAuth, getAuthenticatedTutor);

    tutors: [
        {   
            tutorId: 'gj42hyyuo4m37k345k5dh83',
            typeOfRelation: ['madre', 'padre', 'hermano', 'otro'],
            names: 'Carlos Alberto',
            lastnames: 'Talero Jaocme',
            email: 'carlos.talero.jacome@gmail.com',
            handle: 'CarlosTal84',
            password: 'ashed-string',
            phone: +573005256068,
            location: 'Lonodn, UK',
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            bio: 'Hello, my name is user, nice to meet you'
        }
    ],

    // add kid details
    // app.post('/kid', FBAuth, addKidDetails);

    // get kid details
    // app.get('/kid', FBAuth, getKidDetails);

    kids: [
        {   
            tutorId: 'gj42hyyuo4m37k345k5dh83',
            tutorHandle: 'carlos.talero84',
            kidId: 'dh23ggj5h32g543j5gf43',
            kidHandle: 'Camilin15',
            names: 'Camilo Alberto',
            lastnames: 'Talero Ruiz',
            birthdate: '2015-09-06',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ],

    // get all kid adventures
    // app.get('/kid-adventures', FBAuth, getKidAdventures);

    // post sold kid adventure
    // app.post('/kid-adventures/:adventureId/sold', FBAuth, postSoldKidAdventure);

    // post active adventure
    // app.post('/kid-adventures/:adventureId/active', FBAuth, postActiveKidAdventure);

    kidsAdventures: [
        {   
            tutorHandle: 'CarlosTal84',
            adventureId:'dmn23gtj5h62g563p5gf467',
            active: true,
            remind: '30 min',
            sold: true | false 
        }
    ], 

    // get all kid devices
    // app.get('/kid-devices', FBAuth, getKidDevices);

    // post a kid device
    // app.post('/kid-devices', FBAuth, postKidDevices);

    kidsDevices: [
        {   
            tutorHandle: 'CarlosTal84',
            stationId: 090278279,
            name: 'station center'
        }
    ],

    // get all adventures
    // app.get('/adventures', getAllAdventures);
    // get one adventure
    // app.get('/adventures/:adventureId', getOneAdventure);

    adventures: [
        {   
            adventureId: 'dmn23gtj5h62g563p5gf467',
            title: 'Wild spaces adventures',
            excerpt: 'hello from excerpt',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            createdAt: '2019-03-15T10:59:52.798Z',
            price: 19.99,
            duration: '1 hour',
            tags: ['adventure', 'space'],
            language: ['english'], 
            audioExcerpt: 'audio/dsfsdkfghskdfgs/dgfdhfgdh',
            audioUrl: 'audio/dsfsdkfghskdfgs/dgfdhfgdh',
            likesCount: 2,
            commentCount: 22
        }
    ],
    likesForAdventures: [
        {
            tutorHandle: 'CarlosTal84',
            adventureId: 'hh7O5oWfWucVzGbHH2pa'
        }
    ],
    commentsForAdventures: [
        {
            tutorHandle: 'CarlosTal84',
            adventureId: 'dmn23gtj5h62g563p5gf467',
            bodyComment: 'nice one mate!',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ],
    notifications: [
        {
            read: 'true | false',
            type: 'adventures | kidsAdventures',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ]
}