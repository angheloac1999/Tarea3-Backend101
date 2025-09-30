const router = require('express').Router();
const { query, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

/* Models */
const Users = require('../../models/users');

/* Middlewares */
const apiKeyMiddleware = require('../../middlewares/apiKey');
const basicAuthMiddleware = require('../../middlewares/basicAuth');
const jwtAuthMiddleware = require('../../middlewares/jwtAuth');
const { uuid } = require('zod');

let users = [{
    id: uuid.v4(),
    name: 'Carlos',
    email: 'carlos@gmail.com',
    age: 20
}];

const jwtSecret = 'thisismysecret';

router.use(apiKeyMiddleware);


// Entity: users 
/** */
router.get('/', jwtAuthMiddleware, (req, res) => {
    return Users.getAllUsers((err, users) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting users!'});
        }
        res.json({ code: 'OK', message: 'Users are available!', data:{ users}});
    });
});

router.get('/token', basicAuthMiddleware, (req, res) => {
    jwt.sign({user: req.user}, jwtSecret, {expiresIn: '1h'}, (err, token) => {
        if (err) {
            return res.status(500).json({code: 'ER', message: 'Error generating token!'})
        }
        res.json({code: 'OK', message: 'Token generated successfully!'})
    })
})

router.get('/query', query('id').notEmpty(), (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ code: 'PF', message: 'User ID is required!'});
    }

    const id = req.query.id;

    return Users.getUserById(id, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting user!'});
        }
        if(!user) {
            return res.status(404).json({ code: 'NF', message: 'User not found!'});
        }
        res.json({ code: 'OK', message: 'User is available!', data:{ user}});
    });
});

router.post('/', (req, res) => {
    console.log('POST /users:',req.body);
    const { name, email = new Date().getTime()+ '@gmail.com', age, password, apiKey } = req.body;

    const newUser = { id: new Date().getTime() ,name, email, age, password, apiKey };

    return Users.saveUser(newUser, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error creating user!'});
        }
        res.json({ code: 'OK', message: 'User created successfully!', data: {user}});
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id );

    if(user){
        /** Update user */
        const { name, email, password, apiKey } = req.body;
        user.name = name;
        user.email = email;
        user.age = age;
        user.password = password;
        user.apiKey = apiKey;
        //user.age = age;
        res.json({ code: 'OK', message: 'User updated successfully!', data: { user}});
        return;
    }
    /** User not found  */
    res.status(404).json({ code: 'NF', message: 'User not found!'});
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('DELETE /users/:id:',id);
    const user = users.find(user => user.id == id);
    if (user) {
        users = users.filter(user => user.id != id);
        return res.json({ code: 'OK', message: 'User deleted!', data: { user}})
    }
    res.status(404).json({ code: 'PF', message: 'User not found!'});
});

module.exports = router;