// const admin = require('../firebase-config/firebase-config');
var admin = require("firebase-admin");

var serviceAccount = require('../firebase-config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function checkFirebaseToken(request, response, next) {
    const token = request.headers.authorization;
    if (!token) {
        return response.status(401).json({
            message: "Unauthorized: No Authorization header provided"
        });
    }else{
        admin.auth().verifyIdToken(token).then((decodede)=>{
            if (decodede) {
                next()
            }
        }).catch((error) =>{
            response.status(401).json({
                message  : "Unauthorized"
            })
        })
    }
}

module.exports = checkFirebaseToken;