const models = require('../models');
const {v4 : uuidV4} = require('uuid');
const crypto = require('crypto');



function createUser(request,response) {
    const post = {
        userId : uuidV4(),
        firstName  : request.body.first_name,
        lastName : request.body.last_name,
        email : request.body.email,
        password :  request.body.password
    }

    models.Users.create(post).then(result =>{
        response.status(201).json({
            message : "Successfully Created !",
            data  : result
        })
    }).catch(error =>{
        response.status(500).json({
            message : "Something went wrong !",
            error : error
        })
    })
}

function createUserWithCrypto(request,response) {
    const hash = crypto.createHash('sha256').update(request.body.password).digest('hex');
        if (!hash) {
            response.status(500).json({
                message : "Error hashing password",
                error : err
            })
        }else{
            const post = {
                userId : uuidV4(),
                firstName  : request.body.first_name,
                lastName : request.body.last_name,
                email : request.body.email,
                password : hash
            }
            models.Users.findOne({where : {email : post.email}}).then(result =>{
                if (result) {
                    response.status(409).json({
                        message : "User already exist",
                        user : result
                    })
                }else{
                    models.Users.create(post).then((results)=>{
                        response.status(201).json({
                            message : "User created !",
                            data : results
                        })
                    }).catch(error =>{
                        response.status(500).json({
                            message : "Something went wrong !",
                            error :  error
                        })
                    })
                }
            })
        }
}


function getAllUsers(request,response) {
    models.Users.findAll().then(result =>{
        response.status(201).json({
            message: "Successfully fetched !",
            data : result
        })
    }).catch(error =>{
        response.status(500).json({
            message : "Someting went wrong !",
            error : error
        })
    })
}
// async function getAllUsers(request, response) {
//     try {
//         const result = await models.sequelize.query(`SELECT * FROM users`, { type: sequelize.QueryTypes.SELECT });
//         console.log(result);
//         response.status(201).json({
//             message: "Successfully fetched!",
//             data: result
//         });
//     } catch (error) {
//         console.error(error);
//         response.status(500).json({
//             message: "Something went wrong!",
//             error: error
//         });
//     }
// }


async function getAllUsersRaw(request,response){
    const result = await models.Sequelize.query(`SELECT * FROM users`,{type : models.Sequelize.QueryTypes.SELECT});
    
}

// async function getAllUsers(request,response) { // Make the function async
//     console.log(request.headers)
//     const token = request.headers.authorization;
//     console.log(token)
//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token); // Use await here
//         console.log('sdsds',decodedToken)
//         models.User.findAll().then(result =>{
//             response.status(201).json({
//                 message: "Successfully fetched !",
//                 data : result
//             })
//         }).catch(error =>{
//             response.status(500).json({
//                 message : "Something went wrong !",
//                 error : error
//             })
//         })
//     } catch (error) {
//         response.status(401).json({
//             message : "Unauthorized",
//         })
//     }
// }

function getUserById(request,response){
    const id = {id: request.params.id}
    models.Users.findAll({where : {id : id}}).then(result =>{
        if (result.length > 0) {
            response.status(201).json({
                message : "Successfully fetched !",
                data : result
            })
        } else {
            response.status(401).json({
                message : "User not found !",
                return_code : -1
            })
        }
    }).catch(error =>{
        response.status(500).json({
            message : "Something went wrong !",
            error : error
        })
    })
}

function login(request, response) {
    const userCred = {
        email: request.body.email,
        password: crypto.createHash('sha256').update(request.body.password).digest('hex')
    }

    models.Users.findOne({ where: { email: userCred.email } })
        .then((user) => {
            if (user && user.password === userCred.password) {
                response.status(201).json({
                    message: "Auth provided.",
                    data: user
                })
            } else {
                response.status(404).json({
                    message: "Invalid credentials"
                })
            }
        }).catch(error => {
            response.status(500).json({
                message: "Something went wrong!",
                error: error
            })
        })
}


module.exports = {
    save  : createUser,
    getAllUsers : getAllUsers,
    getUserById : getUserById,
    login : login,
    createUserWithCrypto : createUserWithCrypto
}