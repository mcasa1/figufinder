const PORT = 8000
const express = require('express')
const {MongoClient} = require('mongodb')
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { concat } = require('ethers/lib/utils')
require('dotenv').config()
const path = require("path")

mongoose.connect(process.env.URI, { useNewUrlParser: true });

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))
// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

// Sign up to the Database
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, userId: generatedUserId})

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

// Log in to the Database
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({email})

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(201).json({token, userId: user.user_id})
        }

        res.status(400).json('Invalid Credentials')

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

// Get individual user
app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
})

// Get user's need array

app.get('/need', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user.need)

    } finally {
        await client.close()
    }
})


// Add have
app.put('/addhave', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, value} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const updateDocument = {
            $push: {have : value}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})

// Remove have
app.put('/removehave', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, value} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        
        const query = {user_id: userId}
        const updateDocument = {
            $pull: {have : value}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})

// Add need
app.put('/addneed', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, value} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        
        const query = {user_id: userId}
        const updateDocument = {
            $push: {need : value}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})

// Remove need
app.put('/removeneed', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, value} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const updateDocument = {
            $pull: {need : value}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})
// Match a user need with another user have and push the match to the matches array
app.get('/match', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {user_id: userId}
        const user = await users.findOne(query)
        const usersList = await users.find({}).toArray()
        const usersFiltered = usersList.filter(user => user.user_id !== userId)
        // Compare user need and have and viceversa with every othes user in usersFiltered
        for (let i = 0; i < usersFiltered.length; i++) {
            const userFiltered = usersFiltered[i]
            const userFilteredHave = userFiltered.have
            const userFilteredNeed = userFiltered.need
            userFilteredZonas = userFiltered.zonas
            const userFilteredZonasString = JSON.stringify(userFilteredZonas)

            const userHave = user.have
            const userNeed = user.need
            const userMatches = user.matches
            const userZonas = user.zonas
            // get user_id of userMatches array
            const userMatchesId = JSON.stringify(userMatches.map(matches => matches.user_id))
           
            const userMatchesHas = userMatches.map(matches => matches.has)
            const userMatchesNeeds = userMatches.map(matches => matches.needs)
            
            const match = userFilteredHave.filter(item => userNeed.includes(item))
            const match2 = userFilteredNeed.filter(item => userHave.includes(item))
            const match3 = userFilteredZonas.filter(item => userZonas.includes(item))

            const userZonasString = JSON.stringify(userZonas)
            // Check if users match at at least one zona
            
            const findCommonZona = (userFilteredZonasString, userZonasString) => {
                for (let i = 0; i < userFilteredZonasString.length; i++) {
                    for (let j = 0; j < userZonasString.length; j++) {
                        if (userFilteredZonasString[i] === userZonasString[j]) {
                            return true
                        }
                    }   
                }
                return false
            }

            if (match.length > 0 && match2.length > 0 && findCommonZona(userFilteredZonasString, userZonasString)) {
            
            const matches  = {user_id : userFiltered.user_id, nombre : userFiltered.nombre, apellido : userFiltered.apellido, has : match, needs : match2}
            const matchesString = JSON.stringify(matches)
            const userId = matches.user_id
            
            const userMatches = user.matches
            const userMatchesString = JSON.stringify(userMatches)

            //Has string from matches array
            const hasString = JSON.stringify(matches.has)
            //Needs string from matches array
            const needsString = JSON.stringify(matches.needs)

        
                if (userMatchesString.includes(matchesString)) {
                    console.log('match already in array')
                    return
                }
                // if userMatches was updated and still matches, pull old match and add new match
                else{
                    console.log(needsString)
                    if (userMatchesId.includes(userId) && (hasString !== userMatchesHas || needsString !== userMatchesNeeds)) {
                        console.log('match update')
                        const updateDocument = {
                            $set : {"matches.$[].has" : matches.has , "matches.$[].needs" : matches.needs} 
                        }
                        const user = await users.updateOne(query, updateDocument) 
                        
                    }
                        else{
                    console.log('match not in array')

                    const updateDocument = {
                        $push: {matches : {user_id : userFiltered.user_id, nombre : userFiltered.nombre, apellido : userFiltered.apellido, has : match, needs : match2, zonas : match3}}
                    }
                    const user = await users.updateOne(query, updateDocument)
                }
                }
           
                
            }
            
       
        }
    } finally {
        await client.close()
    }
} )


// Get all Users by userIds in the Database
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]

        const foundUsers = await users.aggregate(pipeline).toArray()

        res.json(foundUsers)

    } finally {
        await client.close()
    }
})



// Update a User in the Database
app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id}

        const updateDocument = {
            
            $set: {
                
                nombre: formData.nombre,
                apellido: formData.apellido,
                
                have: formData.have,
                need: formData.need,
                matches : formData.matches,
                
                
            },
            $push: {
                zonas : formData.zonas,
            }
        }
        

        const insertedUser = await users.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
})

// app.put('/updateuser', async (req, res) => {
//     const client = new MongoClient(uri)
//     const formData = req.body.formData
    
//     try {
//         await client.connect()
//         const database = client.db('app-data')
//         const users = database.collection('users')

//         const query = {user_id: formData.user_id}

//         const updateDocument = {

//             $set: {
//                 "nombre" : formData.nombre , "apellido" : formData.apellido 
                


//             },
//         }

//         const insertedUser = await users.updateOne(query, updateDocument)

//         res.json(insertedUser)

//     } finally {

//         await client.close()
//     }
// } )

app.put('/addzona', async (req, res) => {
    const client = new MongoClient(uri)
    const formDataZona = req.body.formDataZona

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formDataZona.user_id}

        const updateDocument = {
            $push: {
                zonas: formDataZona.zonas
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
} )




// Get Messages by from_userId and to_userId
app.get('/messages', async (req, res) => {
    const {userId, correspondingUserId} = req.query
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')

        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } finally {
        await client.close()
    }
})

// Add a Message to our Database
app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')

        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    } finally {
        await client.close()
    }
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log('server running on PORT ' + PORT))
